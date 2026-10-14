import { formatCurrency, formatDate } from '../services/formatters'
import { getAccountById, getCategoryById } from '../services/dataService'

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'description', label: 'Description' },
  { key: 'company', label: 'Company' },
  { key: 'category', label: 'Category' },
  { key: 'account', label: 'Account' },
  { key: 'amount', label: 'Amount', numeric: true },
]

export default function TransactionTable({ transactions, sort, onSort }) {
  return (
    <div className="table-wrap">
      <table className="txn-table">
        <thead>
          <tr>
            {columns.map((col) => {
              const active = sort.key === col.key
              const ariaSort = active
                ? sort.direction === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={col.numeric ? 'is-numeric' : undefined}
                >
                  <button
                    type="button"
                    className={`sort-btn ${active ? 'is-active' : ''}`}
                    onClick={() => onSort(col.key)}
                  >
                    {col.label}
                    <span className="sort-arrow" aria-hidden="true">
                      {active ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty-state">
                No transactions match your filters.
              </td>
            </tr>
          ) : (
            transactions.map((t) => {
              const category = getCategoryById(t.categoryId)
              const account = getAccountById(t.accountId)
              const isPayment = t.amount < 0
              return (
                <tr key={t.id}>
                  <td className="nowrap">{formatDate(t.date)}</td>
                  <td>
                    {t.description}
                    {t.status === 'pending' ? (
                      <span className="txn-pending">Pending</span>
                    ) : null}
                  </td>
                  <td className="strong">{t.company}</td>
                  <td>
                    <span
                      className="chip"
                      style={{ '--chip-color': category.color }}
                    >
                      {category.name}
                    </span>
                  </td>
                  <td className="nowrap">
                    {account.name} ••{account.last4}
                  </td>
                  <td
                    className={`is-numeric txn-amount ${isPayment ? 'is-credit' : ''}`}
                  >
                    {isPayment ? '+' : '-'}
                    {formatCurrency(Math.abs(t.amount))}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
