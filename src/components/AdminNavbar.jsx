import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminNavbar.css'

function AdminNavbar() {

  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  )

  const adminName =
    localStorage.getItem('adminName') || 'Admin'

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
    localStorage.removeItem('userRole')
    localStorage.removeItem('adminName')

    navigate('/login')
  }

  return (
    <nav className="admin-navbar">

      <div className="container">

        <div className="admin-navbar-inner">

          {/* Logo */}

          <div
            className="admin-brand"
            onClick={() => navigate('/admin-dashboard')}
          >
            <span>❄️</span>
            AC <strong>ServiceHub</strong>
          </div>


          {/* Navigation */}

          <div className="admin-nav-links">

            <button
              onClick={() =>
                navigate('/admin-dashboard')
              }
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate('/admin-services')
              }
            >
              Services
            </button>

            <button
              onClick={() =>
                navigate('/admin-customers')
              }
            >
              Customers
            </button>

            <button
              onClick={() =>
                navigate('/admin-providers')
              }
            >
              Providers
            </button>

            <button
              onClick={() =>
                navigate('/admin-bookings')
              }
            >
              Bookings
            </button>

            <button onClick={() => navigate('/admin-reviews')}>
              Reviews
            </button>

          </div>


          {/* Right Side */}

          <div className="admin-nav-right">

            <span className="admin-name">
              👤 {adminName}
            </span>

            <button
              className="admin-theme-btn"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button
              className="admin-logout-btn"
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

export default AdminNavbar