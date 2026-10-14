import TransactionRow from './TransactionRow'

export default function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return <p className="empty-state">No transactions to show.</p>
  }

  return (
    <ul className="txn-list">
      {transactions.map((t) => (
        <TransactionRow key={t.id} transaction={t} />
      ))}
    </ul>
  )
}
