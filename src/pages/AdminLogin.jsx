import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminLogin.css'

function AdminLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {

    e.preventDefault()

    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    try {

      const response = await axios.post(
        'http://localhost:8080/api/admins/login',
        {
          email: email,
          password: password
        }
      )

      const admin = response.data

      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userRole', 'admin')
      localStorage.setItem('adminName', admin.name)

      alert('Admin login successful!')

      navigate('/admin-dashboard')

    } catch (error) {

      alert('Invalid admin email or password')

    }
  }

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          ❄️
        </div>

        <h1>
          Admin Login
        </h1>

        <p className="admin-login-subtitle">
          Login to manage AC ServiceHub
        </p>

        <form onSubmit={handleLogin}>

          <div className="admin-form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="admin-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="admin-login-submit-btn"
          >
            Login as Admin
          </button>

        </form>

        <button
          className="back-login-btn"
          onClick={() => navigate('/login')}
        >
          ← Back to Customer Login
        </button>

      </div>

    </div>
  )
}

export default AdminLogin