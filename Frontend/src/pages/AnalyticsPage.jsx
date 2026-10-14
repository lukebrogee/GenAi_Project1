import { useState } from 'react'
import AnalyticsFilters from '../components/AnalyticsFilters'
import Card from '../components/Card'
import CardHeading from '../components/CardHeading'
import RankedBars from '../components/RankedBars'
import MonthlyBarChart from '../components/MonthlyBarChart'
import StatTile from '../components/StatTile'
import {
  getPeriodRange,
  getSpendingTransactions,
  spendByAccount,
  spendByCategory,
  spendByMerchant,
  spendByMonth,
  summarizeSpending,
} from '../services/analyticsUtils'
import { useLinkedData } from '../services/useLinkedData'
import { formatCurrency, formatDate, formatPercent } from '../services/formatters'

export default function AnalyticsPage() {
  useLinkedData() // re-render when accounts are linked or unlinked
  const [{ accountId, periodId }, setSelection] = useState({
    accountId: 'all',
    periodId: 'all',
  })

  const range = getPeriodRange(periodId)
  const spending = getSpendingTransactions({ accountId, periodId })
  const summary = summarizeSpending(spending, range)
  const categories = spendByCategory(spending)
  const accounts = spendByAccount(spending)
  const merchants = spendByMerchant(spending)
  const months = spendByMonth(spending, range)

  const { largest, topCategory } = summary

  return (
    <div className="page-grid">
      <Card span={12} label="Analytics filters">
        <div className="analytics-head">
          <CardHeading title="Spending Analytics" />
          <p className="analytics-range">
            {formatDate(range.from)} – {formatDate(range.to)}
          </p>
        </div>
        <AnalyticsFilters
          accountId={accountId}
          periodId={periodId}
          onChange={setSelection}
        />
      </Card>

      <Card span={3} label="Total spent">
        <StatTile
          label="Total spent"
          value={formatCurrency(summary.totalSpent)}
          detail={`${summary.count} purchases`}
        />
      </Card>
      <Card span={3} label="Daily average">
        <StatTile
          label="Daily average"
          value={formatCurrency(summary.dailyAverage)}
          detail="Across the selected period"
        />
      </Card>
      <Card span={3} label="Largest purchase">
        <StatTile
          label="Largest purchase"
          value={largest ? formatCurrency(largest.amount) : '—'}
          detail={largest ? `${largest.company} · ${formatDate(largest.date)}` : ''}
        />
      </Card>
      <Card span={3} label="Top category">
        <StatTile
          label="Top category"
          value={topCategory ? topCategory.label : '—'}
          detail={
            topCategory
              ? `${formatCurrency(topCategory.total)} · ${formatPercent(topCategory.share)} of spend`
              : ''
          }
        />
      </Card>

      <Card span={5} label="Category breakdown">
        <CardHeading title="Spending by Category" />
        <RankedBars data={categories} />
      </Card>

      <Card span={7} label="Monthly trends">
        <CardHeading title="Monthly Spending" />
        <MonthlyBarChart data={months} />
      </Card>

      <Card span={6} label="Spending by account">
        <CardHeading title="Spending by Account" />
        <RankedBars data={accounts} />
      </Card>

      <Card span={6} label="Top merchants">
        <CardHeading title="Top Merchants" />
        <RankedBars data={merchants} />
      </Card>
    </div>
  )
}
