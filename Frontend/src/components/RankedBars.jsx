import { formatCurrency, formatPercent } from '../services/formatters'

// Ranked horizontal bars (largest first) for any breakdown: categories,
// accounts, merchants. Items come from the spendBy* helpers.
export default function RankedBars({ data }) {
  if (data.length === 0) {
    return <p className="empty-state">No spending in this period.</p>
  }
  const max = data[0].total

  return (
    <ul className="cat-bars">
      {data.map(({ id, label, sublabel, icon, color, total, share }) => (
        <li
          key={id}
          className="cat-bar"
          title={`${label}: ${formatCurrency(total)} (${formatPercent(share, 1)})`}
        >
          <span
            className="txn-icon cat-bar-icon"
            style={{ '--txn-color': color }}
            aria-hidden="true"
          >
            {icon}
          </span>
          <div className="cat-bar-body">
            <div className="cat-bar-row">
              <span className="cat-bar-name">
                {label}
                {sublabel ? <span className="muted"> {sublabel}</span> : null}
              </span>
              <span className="cat-bar-value">
                {formatCurrency(total)}
                <span className="cat-bar-share">{formatPercent(share)}</span>
              </span>
            </div>
            <div className="cat-bar-track">
              <span style={{ width: `${(total / max) * 100}%` }} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
