import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminProviders.css'

function AdminProviders() {

  const [providers, setProviders] = useState([])

  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    experience: '',
    status: 'Active'
  })

  // =========================
  // Load Providers
  // =========================

  const loadProviders = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8080/api/providers'
      )

      setProviders(response.data)

    } catch (error) {

      console.error(
        'Error loading providers:',
        error
      )

      alert('Failed to load providers.')

    }
  }

  useEffect(() => {

    loadProviders()

  }, [])


  // =========================
  // Input Change
  // =========================

  const handleInputChange = (e) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  // =========================
  // Add Provider
  // =========================

  const handleAddProvider = () => {

    setEditingId(null)

    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      experience: '',
      status: 'Active'
    })

    setShowForm(true)
  }


  // =========================
  // Edit Provider
  // =========================

  const handleEditProvider = (provider) => {

    setEditingId(provider.id)

    setFormData({
      name: provider.name || '',
      phone: provider.phone || '',
      email: provider.email || '',
      city: provider.city || '',
      experience: provider.experience || '',
      status: provider.status || 'Active'
    })

    setShowForm(true)
  }


  // =========================
  // Add / Update Provider
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.city ||
      !formData.experience
    ) {

      alert('Please fill all fields')

      return
    }


    try {

      if (editingId) {

        // Update Provider

        const updatedProvider = {
          id: editingId,
          ...formData
        }

        await axios.post(
          'http://localhost:8080/api/providers',
          updatedProvider
        )

        alert('Provider updated successfully!')

      } else {

        // Add Provider

        await axios.post(
          'http://localhost:8080/api/providers',
          formData
        )

        alert('Provider added successfully!')

      }


      // Reload latest data from backend

      await loadProviders()

      window.dispatchEvent(
        new Event('providersUpdated')
      )


      // Reset Form

      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        experience: '',
        status: 'Active'
      })

      setEditingId(null)
      setShowForm(false)

    } catch (error) {

      console.error(
        'Provider save error:',
        error
      )

      alert(
        'Failed to save provider. Please try again.'
      )
    }
  }


  // =========================
  // Delete Provider
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this provider?'
    )

    if (!confirmDelete) {
      return
    }


    try {

      await axios.delete(
        `http://localhost:8080/api/providers/${id}`
      )

      alert('Provider deleted successfully!')

      await loadProviders()

      window.dispatchEvent(
        new Event('providersUpdated')
      )

    } catch (error) {

      console.error(
        'Provider delete error:',
        error
      )

      alert(
        'Failed to delete provider. Please try again.'
      )
    }
  }


  // =========================
  // Active / Inactive
  // =========================

  const handleStatusChange = async (provider) => {

    const updatedProvider = {
      ...provider,
      status:
        provider.status === 'Active'
          ? 'Inactive'
          : 'Active'
    }


    try {

      await axios.post(
        'http://localhost:8080/api/providers',
        updatedProvider
      )

      await loadProviders()

      window.dispatchEvent(
        new Event('providersUpdated')
      )

    } catch (error) {

      console.error(
        'Provider status update error:',
        error
      )

      alert(
        'Failed to update provider status.'
      )
    }
  }


  // =========================
  // Search
  // =========================

  const filteredProviders = providers.filter(
    (provider) =>
      (provider.name || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (provider.email || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (provider.city || '')
        .toLowerCase()
        .includes(search.toLowerCase())
  )


  return (
    <div className="admin-providers-page">

      <main className="admin-providers-content">

        <div className="container">

          <div className="admin-providers-header">

            <div>

              <p className="admin-providers-label">
                PROVIDER MANAGEMENT
              </p>

              <h1>
                Manage Providers
              </h1>

              <p>
                Add, edit and manage AC service providers.
              </p>

            </div>


            <button
              className="add-provider-btn"
              onClick={handleAddProvider}
            >
              + Add Provider
            </button>

          </div>


          {/* Provider Statistics */}

          <div className="provider-stats">

            <div className="provider-stat-card">

              <span>🔧</span>

              <div>

                <h3>
                  {providers.length}
                </h3>

                <p>
                  Total Providers
                </p>

              </div>

            </div>


            <div className="provider-stat-card">

              <span>✅</span>

              <div>

                <h3>
                  {
                    providers.filter(
                      (provider) =>
                        provider.status === 'Active'
                    ).length
                  }
                </h3>

                <p>
                  Active Providers
                </p>

              </div>

            </div>


            <div className="provider-stat-card">

              <span>⏸️</span>

              <div>

                <h3>
                  {
                    providers.filter(
                      (provider) =>
                        provider.status === 'Inactive'
                    ).length
                  }
                </h3>

                <p>
                  Inactive Providers
                </p>

              </div>

            </div>

          </div>


          {/* Search */}

          <div className="provider-search-box">

            <input
              type="text"
              placeholder="Search provider by name, email or city..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Provider Form */}

          {showForm && (

            <div className="provider-form-card">

              <div className="provider-form-header">

                <h2>
                  {editingId
                    ? 'Edit Provider'
                    : 'Add New Provider'}
                </h2>

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  ✕
                </button>

              </div>


              <form onSubmit={handleSubmit}>

                <div className="provider-form-grid">


                  <div className="form-group">

                    <label>
                      Provider Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter provider name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Phone *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Experience *
                    </label>

                    <input
                      type="text"
                      name="experience"
                      placeholder="e.g. 3 Years"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                    </select>

                  </div>

                </div>


                <div className="provider-form-actions">

                  <button
                    type="button"
                    className="cancel-provider-btn"
                    onClick={() =>
                      setShowForm(false)
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="save-provider-btn"
                  >

                    {editingId
                      ? 'Update Provider'
                      : 'Add Provider'}

                  </button>

                </div>

              </form>

            </div>

          )}


          {/* Provider Table */}

          {filteredProviders.length > 0 ? (

            <div className="providers-table-wrapper">

              <table className="providers-table">

                <thead>

                  <tr>

                    <th>#</th>
                    <th>Provider</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {filteredProviders.map(
                    (provider, index) => (

                      <tr key={provider.id}>

                        <td>
                          {index + 1}
                        </td>


                        <td>

                          <div className="provider-info">

                            <div className="provider-avatar">

                              {provider.name
                                ?.charAt(0)
                                .toUpperCase()}

                            </div>

                            <strong>
                              {provider.name}
                            </strong>

                          </div>

                        </td>


                        <td>
                          {provider.phone}
                        </td>


                        <td>
                          {provider.email}
                        </td>


                        <td>
                          {provider.city}
                        </td>


                        <td>
                          {provider.experience}
                        </td>


                        <td>

                          <span
                            className={
                              provider.status === 'Active'
                                ? 'provider-status-active'
                                : 'provider-status-inactive'
                            }
                          >
                            {provider.status}
                          </span>

                        </td>


                        <td>

                          <div className="provider-actions">

                            {/* Edit */}

                            <button
                              className="edit-provider-btn"
                              onClick={() =>
                                handleEditProvider(
                                  provider
                                )
                              }
                            >
                              ✏️
                            </button>


                            {/* Status */}

                            <button
                              className="status-provider-btn"
                              onClick={() =>
                                handleStatusChange(
                                  provider
                                )
                              }
                            >

                              {provider.status === 'Active'
                                ? '⏸'
                                : '▶'}

                            </button>


                            {/* Delete */}

                            <button
                              className="delete-provider-btn"
                              onClick={() =>
                                handleDelete(
                                  provider.id
                                )
                              }
                            >
                              🗑
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="no-providers">

              <div className="no-providers-icon">
                🔧
              </div>

              <h2>
                No Providers Found
              </h2>

              <p>
                Add your first AC service provider.
              </p>

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default AdminProviders