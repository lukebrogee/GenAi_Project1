// Cardfolio brand mark: a stack of cards (many accounts, one view) with an
// amber chip on the front card.
export default function Logo({ size = 36, withWordmark = true }) {
  return (
    <span className="logo">
      <svg
        className="logo-mark"
        width={size}
        height={size}
        viewBox="0 0 40 40"
        role="img"
        aria-label="Cardfolio logo"
      >
        <defs>
          <linearGradient id="cardfolio-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-primary-600)" />
            <stop offset="1" stopColor="var(--color-ink-900)" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#cardfolio-bg)" />
        <rect
          x="9"
          y="9"
          width="20"
          height="14"
          rx="3"
          fill="#ffffff"
          opacity="0.35"
          transform="rotate(-8 19 16)"
        />
        <rect x="11" y="15" width="20" height="14" rx="3" fill="#ffffff" />
        <rect x="14" y="18" width="5" height="4" rx="1" fill="var(--color-accent-500)" />
        <rect x="14" y="25" width="12" height="1.8" rx="0.9" fill="var(--color-ink-300)" />
      </svg>
      {withWordmark ? (
        <span className="logo-wordmark">
          Cardfolio
          <span className="logo-wordmark-sub">All your cards</span>
        </span>
      ) : null}
    </span>
  )
}
