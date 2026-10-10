import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.css'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const newCustomer = {
      name: name,
      email: email,
      password: password
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/customers',
        newCustomer
      )

      const savedCustomer = response.data

      // Save currently registered customer
      localStorage.setItem(
        'customer',
        JSON.stringify(savedCustomer)
      )

      // Notify admin/customer pages
      window.dispatchEvent(
        new Event('customersUpdated')
      )

      alert('Registration successful!')

      navigate('/login')

    } catch (error) {

      console.error('Registration error:', error)

      alert('Registration failed. Please try again.')
    }
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          ❄️
        </div>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Register for your AC ServiceHub account
        </p>

        <form onSubmit={handleRegister}>

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="register-submit-btn"
          >
            Create Account
          </button>

        </form>

        <p className="login-text">

          Already have an account?{' '}

          <button
            onClick={() => navigate('/login')}
            className="link-btn"
          >
            Login
          </button>

        </p>

      </div>

    </div>
  )
}

export default Register