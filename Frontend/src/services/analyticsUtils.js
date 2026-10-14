import {
  getAccountById,
  getCategoryById,
  getDateBounds,
  getInstitutionById,
  getTransactions,
} from './dataService'
import { parseDate } from './formatters'
import { DEFAULT_FILTERS, filterTransactions } from './transactionUtils'

export const PERIODS = [
  { id: '30d', label: 'Last 30 days', days: 30 },
  { id: '90d', label: 'Last 90 days', days: 90 },
  { id: 'all', label: 'All time', days: null },
]

const DAY_MS = 24 * 60 * 60 * 1000

function toIso(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${mm}-${dd}`
}

// Date range for a period, ending on the newest transaction in the dataset.
export function getPeriodRange(periodId) {
  const { earliest, latest } = getDateBounds()
  const period = PERIODS.find((p) => p.id === periodId)
  if (!period || period.days === null) return { from: earliest, to: latest }

  const from = parseDate(latest)
  from.setDate(from.getDate() - (period.days - 1))
  const fromIso = toIso(from)
  return { from: fromIso < earliest ? earliest : fromIso, to: latest }
}

// Purchases (no payments) for the chosen card and period.
export function getSpendingTransactions({ accountId, periodId }) {
  const { from, to } = getPeriodRange(periodId)
  return filterTransactions(getTransactions(), {
    ...DEFAULT_FILTERS,
    accountId,
    type: 'purchases',
    dateFrom: from,
    dateTo: to,
  })
}

// Ranked-bar items: { id, label, sublabel?, icon, color, total, share }.
function rankTotals(totals, describe) {
  const grand = [...totals.values()].reduce((a, b) => a + b, 0)
  return [...totals.entries()]
    .map(([key, total]) => ({
      id: key,
      ...describe(key),
      total,
      share: grand ? (total / grand) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total)
}

function sumBy(spending, keyOf) {
  const totals = new Map()
  spending.forEach((t) => {
    const key = keyOf(t)
    totals.set(key, (totals.get(key) ?? 0) + t.amount)
  })
  return totals
}

export function spendByCategory(spending) {
  return rankTotals(sumBy(spending, (t) => t.categoryId), (id) => {
    const category = getCategoryById(id)
    return { label: category.name, icon: category.icon, color: category.color }
  })
}

export function spendByAccount(spending) {
  return rankTotals(sumBy(spending, (t) => t.accountId), (id) => {
    const account = getAccountById(id)
    return {
      label: account.name,
      sublabel: `••${account.last4}`,
      icon: '💳',
      color: getInstitutionById(account.institutionId).color,
    }
  })
}

export function spendByMerchant(spending, limit = 6) {
  const categoryOf = new Map(spending.map((t) => [t.company, t.categoryId]))
  return rankTotals(sumBy(spending, (t) => t.company), (company) => {
    const category = getCategoryById(categoryOf.get(company))
    return { label: company, icon: category.icon, color: category.color }
  }).slice(0, limit)
}

export function summarizeSpending(spending, { from, to }) {
  const totalSpent = spending.reduce((sum, t) => sum + t.amount, 0)
  const days = Math.round((parseDate(to) - parseDate(from)) / DAY_MS) + 1
  const largest = spending.reduce(
    (max, t) => (!max || t.amount > max.amount ? t : max),
    null,
  )

  return {
    totalSpent,
    count: spending.length,
    dailyAverage: totalSpent / days,
    largest,
    topCategory: spendByCategory(spending)[0] ?? null,
  }
}

// One entry per calendar month in the range, including months with no spend.
// `partial` flags months only partly covered by the range.
export function spendByMonth(spending, { from, to }) {
  const totals = new Map()
  const counts = new Map()
  spending.forEach((t) => {
    const key = t.date.slice(0, 7)
    totals.set(key, (totals.get(key) ?? 0) + t.amount)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  })

  const months = []
  const cursor = parseDate(`${from.slice(0, 7)}-01`)
  const end = parseDate(to)
  while (cursor <= end) {
    const monthStart = toIso(cursor)
    const monthEnd = toIso(
      new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0),
    )
    const key = monthStart.slice(0, 7)
    months.push({
      month: key,
      total: totals.get(key) ?? 0,
      count: counts.get(key) ?? 0,
      partial: monthStart < from || monthEnd > to,
    })
    cursor.setMonth(cursor.getMonth() + 1)
  }
  return months
}

// Round an axis maximum up to a tidy value and return evenly spaced ticks.
export function niceScale(max, tickCount = 4) {
  if (max <= 0) return { max: 1, ticks: [0, 1] }
  const raw = max / tickCount
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 1.5, 2, 2.5, 3, 5, 10].map((m) => m * magnitude).find((s) => s >= raw)
  const top = step * Math.ceil(max / step)

  const ticks = []
  for (let v = 0; v <= top + step / 2; v += step) ticks.push(v)
  return { max: top, ticks }
}
