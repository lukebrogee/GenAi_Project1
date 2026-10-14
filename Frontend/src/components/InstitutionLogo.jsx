import amexLogo from '../assets/amex_logo.png'
import bankOfAmericaLogo from '../assets/bank_of_america_logo.jpg'
import capitalOneLogo from '../assets/capital_one_logo.jpg'
import chaseLogo from '../assets/chase_logo.png'
import citiLogo from '../assets/citi_logo.png'
import discoverLogo from '../assets/discover_logo.png'

const logoMap = {
  amex: amexLogo,
  chase: chaseLogo,
  discover: discoverLogo,
  capitalone: capitalOneLogo,
  citi: citiLogo,
  bofa: bankOfAmericaLogo,
}

export default function InstitutionLogo({ institution, size = 44 }) {
  const logoSrc = logoMap[institution.id]

  return (
    <span
      className="inst-logo"
      style={{
        '--inst-color': institution.color,
        width: size,
        height: size,
      }}
      aria-label={`${institution.name} logo`}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`${institution.name} logo`}
          className="inst-logo-image"
        />
      ) : (
        <span className="inst-logo-fallback">{institution.initials}</span>
      )}
    </span>
  )
}
