// A single headline number with a label and optional supporting detail.
export default function StatTile({ label, value, detail }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {detail ? <span className="stat-detail">{detail}</span> : null}
    </div>
  )
}
