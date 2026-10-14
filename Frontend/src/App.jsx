import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TransactionsPage from './pages/TransactionsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import AddAccountPage from './pages/AddAccountPage'
import Logo from './components/Logo'
import './App.css'
import './components.css'
import './analytics.css'
import './addAccount.css'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Add Account', to: '/add-account' },
]

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/add-account" element={<AddAccountPage />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
