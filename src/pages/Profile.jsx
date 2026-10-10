import { useEffect, useState } from 'react'
import axios from 'axios'
import './Profile.css'

function Profile() {

  const [customer, setCustomer] = useState(
    JSON.parse(localStorage.getItem('customer') || 'null')
  )

  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Load customer from backend
  useEffect(() => {

    const loadCustomer = async () => {

      if (!customer?.id) {
        return
      }

      try {

        const response = await axios.get(
          `http://localhost:8080/api/customers/${customer.id}`
        )

        const data = response.data

        setCustomer(data)

        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        })

        localStorage.setItem(
          'customer',
          JSON.stringify(data)
        )

        localStorage.setItem(
          'customerEmail',
          data.email
        )

      } catch (error) {

        console.error(
          'Error loading profile:',
          error
        )

        alert('Unable to load profile')
      }
    }

    loadCustomer()

  }, [])

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {

    const { name, value } = e.target

    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Save Profile
  const handleSaveProfile = async () => {

    if (!formData.name || !formData.email) {

      alert('Name and Email are required')

      return
    }

    try {

      const updatedCustomer = {
        id: customer.id,
        name: formData.name,
        email: formData.email,
        password: customer.password,
        phone: formData.phone,
        address: formData.address
      }

      const response = await axios.post(
        'http://localhost:8080/api/customers',
        updatedCustomer
      )

      const savedCustomer = response.data

      setCustomer(savedCustomer)

      setFormData({
        name: savedCustomer.name || '',
        email: savedCustomer.email || '',
        phone: savedCustomer.phone || '',
        address: savedCustomer.address || ''
      })

      localStorage.setItem(
        'customer',
        JSON.stringify(savedCustomer)
      )

      localStorage.setItem(
        'customerEmail',
        savedCustomer.email
      )

      window.dispatchEvent(
        new Event('customerUpdated')
      )

      setIsEditing(false)

      alert('Profile updated successfully!')

    } catch (error) {

      console.error(
        'Profile update error:',
        error
      )

      alert('Unable to update profile')
    }
  }

  // Change Password
  const handleChangePassword = async () => {

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {

      alert('Please fill all password fields')

      return
    }

    if (
      passwordData.currentPassword !==
      customer?.password
    ) {

      alert('Current password is incorrect')

      return
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {

      alert(
        'New password and confirm password do not match'
      )

      return
    }

    if (passwordData.newPassword.length < 6) {

      alert(
        'Password must be at least 6 characters'
      )

      return
    }

    try {

      const updatedCustomer = {
        ...customer,
        password: passwordData.newPassword
      }

      const response = await axios.post(
        'http://localhost:8080/api/customers',
        updatedCustomer
      )

      const savedCustomer = response.data

      setCustomer(savedCustomer)

      localStorage.setItem(
        'customer',
        JSON.stringify(savedCustomer)
      )

      window.dispatchEvent(
        new Event('customerUpdated')
      )

      alert('Password changed successfully!')

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })

    } catch (error) {

      console.error(
        'Password update error:',
        error
      )

      alert('Unable to change password')
    }
  }

  return (
    <div className="profile-page">

      <div className="container">

        <div className="profile-header">

          <div>

            <p className="profile-label">
              MY ACCOUNT
            </p>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information and account settings.
            </p>

          </div>

          <button
            className="edit-profile-btn"
            onClick={() =>
              setIsEditing(!isEditing)
            }
          >
            {isEditing
              ? '✕ Cancel'
              : '✏️ Edit Profile'}
          </button>

        </div>

        <div className="profile-grid">

          {/* Personal Information */}

          <div className="profile-card">

            <div className="profile-card-title">

              <div className="profile-icon">
                👤
              </div>

              <div>

                <h3>
                  Personal Information
                </h3>

                <p>
                  Your basic account information
                </p>

              </div>

            </div>

            <div className="profile-form">

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your name"
                />

              </div>

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your email"
                />

              </div>

              <div className="form-group">

                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter mobile number"
                />

              </div>

              <div className="form-group">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your address"
                  rows="4"
                />

              </div>

              {isEditing && (

                <button
                  className="save-profile-btn"
                  onClick={handleSaveProfile}
                >
                  💾 Save Changes
                </button>

              )}

            </div>

          </div>

          {/* Change Password */}

          <div className="profile-card">

            <div className="profile-card-title">

              <div className="profile-icon">
                🔐
              </div>

              <div>

                <h3>
                  Change Password
                </h3>

                <p>
                  Keep your account secure
                </p>

              </div>

            </div>

            <div className="profile-form">

              <div className="form-group">

                <label>
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={
                    passwordData.currentPassword
                  }
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />

              </div>

              <div className="form-group">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={
                    passwordData.newPassword
                  }
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />

              </div>

              <div className="form-group">

                <label>
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={
                    passwordData.confirmPassword
                  }
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />

              </div>

              <button
                className="change-password-btn"
                onClick={handleChangePassword}
              >
                🔒 Change Password
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile