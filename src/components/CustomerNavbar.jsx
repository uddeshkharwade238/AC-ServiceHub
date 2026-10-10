import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CustomerNavbar.css'

function CustomerNavbar() {
  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  )

  const customer = JSON.parse(
    localStorage.getItem('customer') || 'null'
  )

  const customerName = customer?.name || 'Customer'

  const toggleTheme = () => {
    const newMode = !darkMode

    setDarkMode(newMode)

    if (newMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('darkMode', 'false')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('customerEmail')
    localStorage.removeItem('userRole')

    navigate('/login')
  }

  return (
    <nav className="customer-navbar">

      <div className="container">

        <div className="customer-navbar-inner">

          {/* Logo */}
          <div
            className="customer-brand"
            onClick={() => navigate('/customer-dashboard')}
          >
            <span>❄️</span>
            AC <strong>ServiceHub</strong>
          </div>

          {/* Navigation */}
          <div className="customer-nav-links">

            <button
              onClick={() => navigate('/customer-dashboard')}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate('/customer-services')}
            >
              Services
            </button>

            <button
              onClick={() => navigate('/my-bookings')}
            >
              My Bookings
            </button>

            <button
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>

          </div>

          {/* Right Side */}
          <div className="customer-nav-right">

            <span className="customer-name">
              👤 {customerName}
            </span>

            <button
              className="customer-theme-btn"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button
              className="customer-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  )
}

export default CustomerNavbar