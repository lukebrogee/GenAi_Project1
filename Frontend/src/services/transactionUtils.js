import { getAccountById, getCategoryById } from './dataService'

export const DEFAULT_FILTERS = {
  search: '',
  accountId: 'all',
  categoryId: 'all',
  type: 'all', // 'all' | 'purchases' | 'payments'
  dateFrom: '',
  dateTo: '',
}

export const PAGE_SIZES = [10, 25, 50]

export const DEFAULT_SORT = { key: 'date', direction: 'desc' }

export function filterTransactions(transactions, filters) {
  const search = filters.search.trim().toLowerCase()

  return transactions.filter((t) => {
    if (filters.accountId !== 'all' && t.accountId !== filters.accountId) {
      return false
    }
    if (filters.categoryId !== 'all' && t.categoryId !== filters.categoryId) {
      return false
    }
    if (filters.type === 'purchases' && t.amount < 0) return false
    if (filters.type === 'payments' && t.amount >= 0) return false
    if (filters.dateFrom && t.date < filters.dateFrom) return false
    if (filters.dateTo && t.date > filters.dateTo) return false
    if (
      search &&
      !`${t.company} ${t.description}`.toLowerCase().includes(search)
    ) {
      return false
    }
    return true
  })
}

// Value used to order each sortable column.
const sortValue = {
  date: (t) => t.date,
  description: (t) => t.description.toLowerCase(),
  company: (t) => t.company.toLowerCase(),
  amount: (t) => t.amount,
  category: (t) => getCategoryById(t.categoryId).name.toLowerCase(),
  account: (t) => getAccountById(t.accountId).name.toLowerCase(),
}

export function sortTransactions(transactions, { key, direction }) {
  const getValue = sortValue[key]
  const factor = direction === 'asc' ? 1 : -1

  return [...transactions].sort((a, b) => {
    const va = getValue(a)
    const vb = getValue(b)
    if (va < vb) return -1 * factor
    if (va > vb) return 1 * factor
    return b.id.localeCompare(a.id) // stable, newest first on ties
  })
}

export function paginate(items, page, pageSize) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(page, 1), pageCount)
  const startIndex = (current - 1) * pageSize

  return {
    items: items.slice(startIndex, startIndex + pageSize),
    page: current,
    pageCount,
    startIndex,
    endIndex: Math.min(startIndex + pageSize, items.length),
    total: items.length,
  }
}

// Page numbers to show, with null marking a gap: [1, null, 4, 5, 6, null, 12]
export function getPageWindow(page, pageCount, siblings = 1) {
  const pages = new Set([1, pageCount])
  for (let p = page - siblings; p <= page + siblings; p++) {
    if (p >= 1 && p <= pageCount) pages.add(p)
  }
  const sorted = [...pages].sort((a, b) => a - b)

  const result = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push(null)
    result.push(p)
  })
  return result
}
