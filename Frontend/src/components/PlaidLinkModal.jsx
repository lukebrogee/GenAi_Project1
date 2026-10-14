import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '../services/formatters'
import InstitutionLogo from './InstitutionLogo'

// Simulated Plaid-Link-style flow: sign in -> choose accounts -> connecting
// -> done. Nothing is sent anywhere; accounts come from the prepared mock data.
// `institution` is an entry from getInstitutions().
export default function PlaidLinkModal({ institution, onLink, onClose }) {
  const available = institution.accounts.filter(
    (a) => !institution.linkedAccounts.some((l) => l.id === a.id),
  )

  const [step, setStep] = useState('login')
  const [selected, setSelected] = useState(() => new Set(available.map((a) => a.id)))
  const dialogRef = useRef(null)
  const busy = step === 'connecting'

  useEffect(() => {
    dialogRef.current?.focus()
  }, [step])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && !busy) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  // Simulated network round-trip, then commit the chosen accounts.
  useEffect(() => {
    if (step !== 'connecting') return undefined
    const timer = setTimeout(() => {
      onLink([...selected])
      setStep('done')
    }, 1400)
    return () => clearTimeout(timer)
  }, [step, selected, onLink])

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onClose()
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="link-modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <header className="modal-head">
          <InstitutionLogo institution={institution} size={40} />
          <h2 id="link-modal-title">
            {step === 'done' ? 'Account linked' : `Connect ${institution.name}`}
          </h2>
        </header>

        {step === 'login' ? (
          <form
            className="modal-body"
            onSubmit={(e) => {
              e.preventDefault()
              setStep('accounts')
            }}
          >
            <p className="modal-note">
              Sign in to {institution.name}. This is a demo: the fields below are
              pre-filled sandbox values and no real credentials are used.
            </p>
            <label className="field">
              <span>Username</span>
              <input type="text" defaultValue="demo_user" autoComplete="off" />
            </label>
            <label className="field">
              <span>Password</span>
              <input type="password" defaultValue="demo_password" autoComplete="off" />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn-link" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </form>
        ) : null}

        {step === 'accounts' ? (
          <div className="modal-body">
            <p className="modal-note">Choose the accounts to bring into Cardfolio.</p>
            <ul className="modal-accounts">
              {institution.accounts.map((account) => {
                const isLinked = institution.linkedAccounts.some(
                  (l) => l.id === account.id,
                )
                return (
                  <li key={account.id}>
                    <label className={`modal-account ${isLinked ? 'is-disabled' : ''}`}>
                      <input
                        type="checkbox"
                        disabled={isLinked}
                        checked={isLinked || selected.has(account.id)}
                        onChange={() => toggle(account.id)}
                      />
                      <span className="modal-account-main">
                        <strong>{account.name}</strong>
                        <span className="muted">
                          {account.network} ••{account.last4}
                        </span>
                      </span>
                      <span className="modal-account-side">
                        {isLinked ? 'Already linked' : formatCurrency(account.currentBalance)}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <div className="modal-actions">
              <button type="button" className="btn-link" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={selected.size === 0}
                onClick={() => setStep('connecting')}
              >
                Connect {selected.size} {selected.size === 1 ? 'account' : 'accounts'}
              </button>
            </div>
          </div>
        ) : null}

        {step === 'connecting' ? (
          <div className="modal-body modal-center" role="status">
            <span className="spinner" aria-hidden="true" />
            <p>Securely connecting to {institution.name}&hellip;</p>
          </div>
        ) : null}

        {step === 'done' ? (
          <div className="modal-body modal-center">
            <span className="check-badge" aria-hidden="true">✓</span>
            <p>
              {selected.size} {selected.size === 1 ? 'account' : 'accounts'} from{' '}
              {institution.name} {selected.size === 1 ? 'is' : 'are'} now part of
              your dashboard.
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
