import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? 'navbar-dark-mode' : ''
      }`}
    >
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <span className="logo-icon">❄️</span>
          AC <span>ServiceHub</span>
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* Home */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                to="/"
              >
                Home
              </Link>
            </li>

            {/* Services */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/services'
                    ? 'active'
                    : ''
                }`}
                to="/services"
              >
                Services
              </Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/about'
                    ? 'active'
                    : ''
                }`}
                to="/about"
              >
                About
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/contact'
                    ? 'active'
                    : ''
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>

            {/* Theme Button */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">

              <button
                className="theme-btn"
                onClick={toggleTheme}
                title={
                  darkMode
                    ? 'Switch to Light Mode'
                    : 'Switch to Dark Mode'
                }
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

            </li>

            {/* Login */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">

              <Link
                className="login-btn"
                to="/login"
              >
                Login
              </Link>

            </li>

            {/* Register */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">

              <Link
                className="register-btn"
                to="/register"
              >
                Register
              </Link>

            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar