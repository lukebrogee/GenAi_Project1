import { getInstitutions } from '../services/dataService'
import InstitutionLogo from './InstitutionLogo'

// Grid of institutions the user can connect. Picking one starts the link flow.
export default function InstitutionPicker({ onSelect }) {
  return (
    <ul className="inst-grid">
      {getInstitutions().map((institution) => {
        const available = institution.accounts.length
        const linked = institution.linkedAccounts.length
        const allLinked = linked === available

        return (
          <li key={institution.id}>
            <button
              type="button"
              className="inst-tile"
              disabled={allLinked}
              onClick={() => onSelect(institution.id)}
            >
              <InstitutionLogo institution={institution} />
              <span className="inst-tile-name">{institution.name}</span>
              <span
                className={`inst-tile-status ${allLinked ? 'is-linked' : ''}`}
              >
                {allLinked
                  ? '✓ Connected'
                  : linked > 0
                    ? `${available - linked} more available`
                    : 'Connect'}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
