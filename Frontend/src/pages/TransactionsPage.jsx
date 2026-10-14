import { useState } from 'react'
import Card from '../components/Card'
import CardHeading from '../components/CardHeading'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'
import TransactionTable from '../components/TransactionTable'
import { getTransactions } from '../services/dataService'
import { useLinkedData } from '../services/useLinkedData'
import {
  DEFAULT_FILTERS,
  DEFAULT_SORT,
  PAGE_SIZES,
  filterTransactions,
  paginate,
  sortTransactions,
} from '../services/transactionUtils'

export default function TransactionsPage() {
  useLinkedData() // re-render when accounts are linked or unlinked
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState(DEFAULT_SORT)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])

  const filtered = filterTransactions(getTransactions(), filters)
  const sorted = sortTransactions(filtered, sort)
  const view = paginate(sorted, page, pageSize)

  const handleFilters = (next) => {
    setFilters(next)
    setPage(1)
  }

  // Clicking the active column flips direction; a new column starts sensibly
  // (newest/largest first for date and amount, A–Z for text).
  const handleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: key === 'date' || key === 'amount' ? 'desc' : 'asc' },
    )
    setPage(1)
  }

  const handlePageSize = (size) => {
    setPageSize(size)
    setPage(1)
  }

  return (
    <div className="page-grid">
      <Card span={12} label="Filters">
        <CardHeading title="Filters" />
        <FilterBar
          filters={filters}
          onChange={handleFilters}
          resultCount={filtered.length}
        />
      </Card>

      <Card span={12} label="Transactions table">
        <CardHeading title="All Transactions" />
        <TransactionTable
          transactions={view.items}
          sort={sort}
          onSort={handleSort}
        />
        <Pagination
          page={view.page}
          pageCount={view.pageCount}
          startIndex={view.startIndex}
          endIndex={view.endIndex}
          total={view.total}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={handlePageSize}
        />
      </Card>
    </div>
  )
}
