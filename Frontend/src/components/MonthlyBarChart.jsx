import { niceScale } from '../services/analyticsUtils'
import {
  formatCompactCurrency,
  formatCurrency,
  formatMonth,
} from '../services/formatters'

// Total spend per month as vertical bars. Single series, so no legend; the
// peak month is labelled, every bar has a hover/focus tooltip, and partial
// months are hatched. A visually hidden table mirrors the data.
export default function MonthlyBarChart({ data }) {
  if (data.length === 0) {
    return <p className="empty-state">No spending in this period.</p>
  }

  const { max, ticks } = niceScale(Math.max(...data.map((d) => d.total)))
  const peak = data.reduce((a, b) => (b.total > a.total ? b : a))
  const hasPartial = data.some((d) => d.partial)

  return (
    <figure className="mchart">
      <div className="mchart-body">
        <div className="mchart-axis" aria-hidden="true">
          {ticks.map((tick) => (
            <span key={tick} style={{ bottom: `${(tick / max) * 100}%` }}>
              {formatCompactCurrency(tick)}
            </span>
          ))}
        </div>

        <div className="mchart-plot">
          {ticks.map((tick) => (
            <span
              key={tick}
              className="mchart-grid"
              style={{ bottom: `${(tick / max) * 100}%` }}
              aria-hidden="true"
            />
          ))}

          {data.map((d) => {
            const pct = (d.total / max) * 100
            const label = `${formatMonth(d.month, 'long')}${d.partial ? ' (partial month)' : ''}: ${formatCurrency(d.total)}`
            return (
              <div className="mchart-col" key={d.month}>
                <div
                  className={`mchart-bar ${d.partial ? 'is-partial' : ''}`}
                  style={{ height: `${pct}%` }}
                  tabIndex={0}
                  role="img"
                  aria-label={label}
                />
                {d === peak ? (
                  <span
                    className="mchart-peak"
                    style={{ bottom: `${pct}%` }}
                    aria-hidden="true"
                  >
                    {formatCurrency(d.total)}
                  </span>
                ) : null}
                <div
                  className="mchart-tip"
                  style={{ bottom: `calc(${pct}% + 10px)` }}
                  aria-hidden="true"
                >
                  <strong>{formatMonth(d.month, 'long')}</strong>
                  <span>{formatCurrency(d.total)}</span>
                  <span>
                    {d.count} purchases{d.partial ? ' · partial month' : ''}
                  </span>
                </div>
                <span className="mchart-x" aria-hidden="true">
                  {formatMonth(d.month)}
                  {d.partial ? '*' : ''}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {hasPartial ? (
        <figcaption className="mchart-note">
          * Hatched bars cover only part of the month.
        </figcaption>
      ) : null}

      <table className="sr-only">
        <caption>Spending by month</caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total spent</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.month}>
              <td>{formatMonth(d.month, 'long')}</td>
              <td>{formatCurrency(d.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
