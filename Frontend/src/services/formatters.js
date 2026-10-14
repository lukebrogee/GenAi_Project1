const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// 1234.5 -> "$1,234.50"; negatives (payments) -> "-$1,234.50"
export function formatCurrency(amount) {
  return currency.format(amount)
}

// Parse "YYYY-MM-DD" as a local date (avoids the UTC off-by-one-day bug).
export function parseDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// "2026-10-13" -> "Oct 13, 2026"
export function formatDate(isoDate) {
  return parseDate(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// "2026-10-13" -> "Oct 13"
export function formatShortDate(isoDate) {
  return parseDate(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

// 12500 -> "$12.5K" (axis labels)
export function formatCompactCurrency(amount) {
  return compactCurrency.format(amount)
}

// "2026-06" -> "Jun", or "June 2026" with style 'long'
export function formatMonth(monthKey, style = 'short') {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString(
    'en-US',
    style === 'short'
      ? { month: 'short' }
      : { month: 'long', year: 'numeric' },
  )
}

export function formatPercent(value, digits = 0) {
  return `${value.toFixed(digits)}%`
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}
