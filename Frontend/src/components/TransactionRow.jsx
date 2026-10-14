import { formatCurrency, formatShortDate } from '../services/formatters'
import { getAccountById, getCategoryById } from '../services/dataService'

// One transaction line. Reusable by any list that shows transactions.
export default function TransactionRow({ transaction }) {
  const category = getCategoryById(transaction.categoryId)
  const account = getAccountById(transaction.accountId)
  const isPayment = transaction.amount < 0

  return (
    <li className="txn-row">
      <span
        className="txn-icon"
        style={{ '--txn-color': category.color }}
        aria-hidden="true"
      >
        {category.icon}
      </span>
      <div className="txn-main">
        <span className="txn-company">{transaction.company}</span>
        <span className="txn-meta">
          {category.name} &middot; {account.name} ••{account.last4}
        </span>
      </div>
      <div className="txn-side">
        <span className={`txn-amount ${isPayment ? 'is-credit' : ''}`}>
          {isPayment ? '+' : '-'}
          {formatCurrency(Math.abs(transaction.amount))}
        </span>
        <span className="txn-date">
          {formatShortDate(transaction.date)}
          {transaction.status === 'pending' ? (
            <span className="txn-pending">Pending</span>
          ) : null}
        </span>
      </div>
    </li>
  )
}
