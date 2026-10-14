// A Card is a blank, pre-formatted section of a page. It has no content of its
// own: pages arrange Cards on the grid, then place components inside them.
export default function Card({
  children,
  span = 12,
  height,
  label,
  className = '',
}) {
  const style = { '--card-span': span }
  if (height) style.minHeight = height

  return (
    <section
      className={`card ${className}`.trim()}
      style={style}
      aria-label={label}
    >
      {children}
    </section>
  )
}
