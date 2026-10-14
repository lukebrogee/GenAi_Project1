import { formatCurrency } from '../services/formatters'
import { getInstitutions } from '../services/dataService'
import InstitutionLogo from './InstitutionLogo'

// Connected institutions with their accounts, each with an Unlink action.
export default function LinkedInstitutionList({ onUnlink }) {
  const connected = getInstitutions().filter((i) => i.linkedAccounts.length > 0)

  if (connected.length === 0) {
    return (
      <p className="empty-state">
        No accounts connected yet. Pick an institution to get started.
      </p>
    )
  }

  return (
    <ul className="linked-list">
      {connected.map((institution) => (
        <li key={institution.id} className="linked-item">
          <div className="linked-head">
            <InstitutionLogo institution={institution} size={36} />
            <strong>{institution.name}</strong>
            <button
              type="button"
              className="btn-link btn-danger"
              onClick={() => onUnlink(institution)}
            >
              Unlink
            </button>
          </div>
          <ul className="linked-accounts">
            {institution.linkedAccounts.map((account) => (
              <li key={account.id}>
                <span>
                  {account.name} <span className="muted">••{account.last4}</span>
                </span>
                <span className="linked-balance">
                  {formatCurrency(account.currentBalance)}
                </span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
