import { Link } from 'react-router-dom'

// Title row placed at the top of a Card's content, with an optional link.
export default function CardHeading({ title, linkTo, linkLabel }) {
  return (
    <div className="card-heading">
      <h2>{title}</h2>
      {linkTo ? (
        <Link to={linkTo} className="card-heading-link">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  )
}
