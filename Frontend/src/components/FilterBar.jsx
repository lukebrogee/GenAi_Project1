import { DEFAULT_FILTERS } from '../services/transactionUtils'
import { getAccounts, getCategories } from '../services/dataService'

export default function FilterBar({ filters, onChange, resultCount }) {
  const update = (field) => (event) =>
    onChange({ ...filters, [field]: event.target.value })

  const isDirty = Object.keys(DEFAULT_FILTERS).some(
    (key) => filters[key] !== DEFAULT_FILTERS[key],
  )

  return (
    <form className="filter-bar" onSubmit={(e) => e.preventDefault()}>
      <label className="field field-search">
        <span>Search</span>
        <input
          type="search"
          placeholder="Company or description"
          value={filters.search}
          onChange={update('search')}
        />
      </label>

      <label className="field">
        <span>Credit card</span>
        <select value={filters.accountId} onChange={update('accountId')}>
          <option value="all">All cards</option>
          {getAccounts().map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ••{a.last4}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Category</span>
        <select value={filters.categoryId} onChange={update('categoryId')}>
          <option value="all">All categories</option>
          {getCategories().map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Type</span>
        <select value={filters.type} onChange={update('type')}>
          <option value="all">All activity</option>
          <option value="purchases">Purchases</option>
          <option value="payments">Payments</option>
        </select>
      </label>

      <div className="date-range-fields">
        <label className="field">
          <span>From</span>
          <input
            type="date"
            value={filters.dateFrom}
            max={filters.dateTo || undefined}
            onChange={update('dateFrom')}
          />
        </label>

        <label className="field">
          <span>To</span>
          <input
            type="date"
            value={filters.dateTo}
            min={filters.dateFrom || undefined}
            onChange={update('dateTo')}
          />
        </label>
      </div>

      <div className="filter-actions">
        <span className="filter-count" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </span>
        <button
          type="button"
          className="btn-link"
          disabled={!isDirty}
          onClick={() => onChange(DEFAULT_FILTERS)}
        >
          Reset filters
        </button>
      </div>
    </form>
  )
}
