import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    // Check empty fields
    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    const loginData = {
      email: email,
      password: password
    }

    try {

      const response = await axios.post(
        'http://localhost:8080/api/customers/login',
        loginData
      )

      const loggedInCustomer = response.data

      // Customer not found
      if (!loggedInCustomer) {
        alert('Invalid email or password')
        return
      }

      // Save login information
      localStorage.setItem(
        'customer',
        JSON.stringify(loggedInCustomer)
      )

      localStorage.setItem(
        'isLoggedIn',
        'true'
      )

      localStorage.setItem(
        'userRole',
        'customer'
      )

      localStorage.setItem(
        'customerEmail',
        loggedInCustomer.email
      )

      alert(`Welcome ${loggedInCustomer.name}!`)

      // Go to Customer Dashboard
      navigate('/customer-dashboard')

    } catch (error) {

      console.error('Login error:', error)

      alert('Unable to login. Please try again.')
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          ❄️
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your AC ServiceHub account
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-submit-btn"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="register-text">

          Don't have an account?{' '}

          <button
            onClick={() => navigate('/register')}
            className="link-btn"
          >
            Register
          </button>

        </p>

        {/* Admin Login */}
        <div className="admin-login-link">

          <button
            onClick={() => navigate('/admin-login')}
            className="admin-link-btn"
          >
            Login as Admin
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login