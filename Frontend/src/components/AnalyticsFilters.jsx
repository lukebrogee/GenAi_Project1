import { PERIODS } from '../services/analyticsUtils'
import { getAccounts } from '../services/dataService'

export default function AnalyticsFilters({ accountId, periodId, onChange }) {
  return (
    <form className="analytics-filters" onSubmit={(e) => e.preventDefault()}>
      <label className="field">
        <span>Credit card</span>
        <select
          value={accountId}
          onChange={(e) => onChange({ accountId: e.target.value, periodId })}
        >
          <option value="all">All cards</option>
          {getAccounts().map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ••{a.last4}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Period</span>
        <select
          value={periodId}
          onChange={(e) => onChange({ accountId, periodId: e.target.value })}
        >
          {PERIODS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}
