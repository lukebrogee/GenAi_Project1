import { PAGE_SIZES, getPageWindow } from '../services/transactionUtils'

export default function Pagination({
  page,
  pageCount,
  startIndex,
  endIndex,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <div className="pagination">
      <p className="pagination-summary">
        {total === 0
          ? 'Showing 0 of 0'
          : `Showing ${startIndex + 1}–${endIndex} of ${total}`}
      </p>

      <nav className="pagination-pages" aria-label="Pagination">
        <button
          type="button"
          className="page-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>
        {getPageWindow(page, pageCount).map((p, i) =>
          p === null ? (
            <span key={`gap-${i}`} className="page-gap" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`page-btn ${p === page ? 'is-current' : ''}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          className="page-btn"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </nav>

      <label className="pagination-size">
        <span>Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
