import { Link } from 'react-router-dom'
import Card from '../components/Card'
import CardHeading from '../components/CardHeading'
import CreditCardWidget from '../components/CreditCardWidget'
import GreetingBanner from '../components/GreetingBanner'
import TransactionList from '../components/TransactionList'
import { getAccounts, getRecentTransactions } from '../services/dataService'
import { useLinkedData } from '../services/useLinkedData'

export default function HomePage() {
  useLinkedData()
  const accounts = getAccounts()

  return (
    <div className="page-grid">
      <Card span={12} label="Greeting" className="card-hero">
        <GreetingBanner />
      </Card>

      <Card span={7} label="Recent transactions">
        <CardHeading
          title="Recent Transactions"
          linkTo="/transactions"
          linkLabel="View all"
        />
        <TransactionList transactions={getRecentTransactions(10)} />
      </Card>

      <Card span={5} label="Credit card summaries">
        <CardHeading
          title="Linked Accounts"
          linkTo="/add-account"
          linkLabel="Add account"
        />
        {accounts.length === 0 ? (
          <p className="empty-state">
            No accounts linked yet.{' '}
            <Link to="/add-account">Connect your first account</Link>
          </p>
        ) : (
          <div className="cc-stack">
            {accounts.map((account) => (
              <CreditCardWidget key={account.id} account={account} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
