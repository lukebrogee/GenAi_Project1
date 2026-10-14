import { formatCurrency, formatDate, formatPercent } from '../services/formatters'

// Visual credit card with balance, limit and next payment. Takes an account
// object from the mock data; also reusable on the Add Account preview.
export default function CreditCardWidget({ account }) {
  const utilization = account.creditLimit
    ? (account.currentBalance / account.creditLimit) * 100
    : 0

  return (
    <article className={`cc cc-${account.theme}`}>
      <header className="cc-top">
        <span className="cc-name">{account.name}</span>
        <span className="cc-network">{account.network}</span>
      </header>

      <p className="cc-number">•••• •••• •••• {account.last4}</p>

      <div className="cc-balance">
        <span className="cc-label">Current balance</span>
        <span className="cc-balance-value">
          {formatCurrency(account.currentBalance)}
        </span>
      </div>

      <div
        className="cc-meter"
        role="progressbar"
        aria-valuenow={Math.round(utilization)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${account.name} credit used`}
      >
        <span style={{ width: `${Math.min(utilization, 100)}%` }} />
      </div>
      <div className="cc-meter-labels">
        <span>{formatPercent(utilization)} used</span>
        <span>{formatCurrency(account.availableCredit)} available</span>
      </div>

      <footer className="cc-footer">
        <div>
          <span className="cc-label">Payment due</span>
          <span>
            {account.paymentDueDate ? formatDate(account.paymentDueDate) : '—'}
          </span>
        </div>
        <div>
          <span className="cc-label">Minimum</span>
          <span>{formatCurrency(account.minimumPayment)}</span>
        </div>
      </footer>
    </article>
  )
}
