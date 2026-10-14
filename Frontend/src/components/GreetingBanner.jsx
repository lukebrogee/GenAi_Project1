import { useState } from 'react'
import {
  formatCurrency,
  formatPercent,
  getGreeting,
} from '../services/formatters'
import {
  getAccounts,
  getTotalBalance,
  getTotalCreditLimit,
  getUser,
} from '../services/dataService'

export default function GreetingBanner() {
  const { firstName } = getUser()
  const balance = getTotalBalance()
  const limit = getTotalCreditLimit()
  const accountCount = getAccounts().length
  const [now] = useState(() => new Date())
  const today = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="greeting">
      <div>
        <p className="greeting-date">{today}</p>
        <h1 className="greeting-title">
          {getGreeting(now)}, {firstName}
        </h1>
        <p className="greeting-sub">
          {accountCount === 0
            ? 'Link an account to see your spending in one place.'
            : `Your combined view across ${accountCount} linked ${accountCount === 1 ? 'account' : 'accounts'}.`}
        </p>
      </div>
      <dl className="greeting-stats">
        <div>
          <dt>Total balance</dt>
          <dd>{formatCurrency(balance)}</dd>
        </div>
        <div>
          <dt>Available credit</dt>
          <dd>{formatCurrency(limit - balance)}</dd>
        </div>
        <div>
          <dt>Utilization</dt>
          <dd>{formatPercent(limit ? (balance / limit) * 100 : 0)}</dd>
        </div>
      </dl>
    </div>
  )
}
