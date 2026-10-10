import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminServices.css'

function AdminServices() {

  const [services, setServices] = useState([])

  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rating: '',
    ratingCount: '',
    description: '',
    image: '',
    status: 'Active'
  })

  // Load services from backend
  useEffect(() => {

    axios
      .get('http://localhost:8080/api/services')
      .then((response) => {

        const backendServices = response.data.map((service) => ({
          id: service.id,
          name: service.serviceName,
          price: service.price,
          rating: service.rating,
          ratingCount: service.ratingCount,
          description: service.description,
          image: service.imageUrl,
          status: service.status
        }))

        setServices(backendServices)

      })
      .catch((error) => {

        console.error('Error loading services:', error)
        alert('Unable to load services')

      })

  }, [])


  const handleInputChange = (e) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

  }


  const handleAddService = () => {

    setEditingId(null)

    setFormData({
      name: '',
      price: '',
      rating: '',
      ratingCount: '',
      description: '',
      image: '',
      status: 'Active'
    })

    setShowForm(true)

  }


  const handleEditService = (service) => {

    setEditingId(service.id)

    setFormData({
      name: service.name || '',
      price: service.price ?? '',
      rating: service.rating ?? '',
      ratingCount: service.ratingCount ?? '',
      description: service.description || '',
      image: service.image || '',
      status: service.status || 'Active'
    })

    setShowForm(true)

  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !formData.name ||
      !formData.price ||
      !formData.description
    ) {

      alert('Please fill all required fields')
      return

    }


    // Validate rating
    if (
      formData.rating === '' ||
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    ) {

      alert('Please enter a rating between 0 and 5')
      return

    }


    // Validate rating count
    if (
      formData.ratingCount === '' ||
      Number(formData.ratingCount) < 0
    ) {

      alert('Please enter a valid rating count')
      return

    }


    const serviceData = {

      serviceName: formData.name,
      price: Number(formData.price),
      rating: Number(formData.rating),
      ratingCount: Number(formData.ratingCount),
      description: formData.description,
      imageUrl: formData.image,
      status: formData.status

    }


    try {

      // Edit existing service
      if (editingId) {

        const response = await axios.post(
          'http://localhost:8080/api/services',
          {
            id: editingId,
            ...serviceData
          }
        )

        const updatedService = {
          id: response.data.id,
          name: response.data.serviceName,
          price: response.data.price,
          rating: response.data.rating,
          ratingCount: response.data.ratingCount,
          description: response.data.description,
          image: response.data.imageUrl,
          status: response.data.status
        }

        setServices((prev) =>
          prev.map((service) =>
            service.id === editingId
              ? updatedService
              : service
          )
        )

        alert('Service updated successfully!')

      }

      // Add new service
      else {

        const response = await axios.post(
          'http://localhost:8080/api/services',
          serviceData
        )

        const newService = {
          id: response.data.id,
          name: response.data.serviceName,
          price: response.data.price,
          rating: response.data.rating,
          ratingCount: response.data.ratingCount,
          description: response.data.description,
          image: response.data.imageUrl,
          status: response.data.status
        }

        setServices((prev) => [
          ...prev,
          newService
        ])

        alert('Service added successfully!')

      }


      // Notify other frontend pages
      window.dispatchEvent(
        new Event('servicesUpdated')
      )


      setFormData({
        name: '',
        price: '',
        rating: '',
        ratingCount: '',
        description: '',
        image: '',
        status: 'Active'
      })

      setEditingId(null)
      setShowForm(false)

    }

    catch (error) {

      console.error('Error saving service:', error)

      alert('Unable to save service')

    }

  }


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this service?'
    )

    if (!confirmDelete) {
      return
    }


    try {

      await axios.delete(
        `http://localhost:8080/api/services/${id}`
      )


      setServices((prev) =>
        prev.filter((service) => service.id !== id)
      )


      window.dispatchEvent(
        new Event('servicesUpdated')
      )


      alert('Service deleted successfully!')

    }

    catch (error) {

      console.error('Error deleting service:', error)

      alert('Unable to delete service')

    }

  }


  const handleStatusChange = async (id) => {

    const service = services.find(
      (service) => service.id === id
    )

    if (!service) {
      return
    }


    const newStatus =
      service.status === 'Active'
        ? 'Inactive'
        : 'Active'


    const serviceData = {

      id: service.id,
      serviceName: service.name,
      price: Number(service.price),
      rating: Number(service.rating),
      ratingCount: Number(service.ratingCount),
      description: service.description,
      imageUrl: service.image,
      status: newStatus

    }


    try {

      const response = await axios.post(
        'http://localhost:8080/api/services',
        serviceData
      )


      const updatedService = {
        id: response.data.id,
        name: response.data.serviceName,
        price: response.data.price,
        rating: response.data.rating,
        ratingCount: response.data.ratingCount,
        description: response.data.description,
        image: response.data.imageUrl,
        status: response.data.status
      }


      setServices((prev) =>
        prev.map((item) =>
          item.id === id
            ? updatedService
            : item
        )
      )


      window.dispatchEvent(
        new Event('servicesUpdated')
      )

    }

    catch (error) {

      console.error('Error changing service status:', error)

      alert('Unable to change service status')

    }

  }


  const filteredServices = services.filter(
    (service) =>
      service.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )


  return (

    <div className="admin-services-page">

      <main className="admin-services-content">

        <div className="container">


          {/* Header */}

          <div className="admin-services-header">

            <div>

              <p className="admin-services-label">
                SERVICE MANAGEMENT
              </p>

              <h1>
                Manage AC Services
              </h1>

              <p>
                Add, edit, delete and manage your AC services.
              </p>

            </div>


            <button
              className="add-service-btn"
              onClick={handleAddService}
            >
              + Add Service
            </button>

          </div>


          {/* Stats */}

          <div className="admin-service-stats">


            <div className="service-stat-card">

              <span>❄️</span>

              <div>

                <h3>
                  {services.length}
                </h3>

                <p>
                  Total Services
                </p>

              </div>

            </div>


            <div className="service-stat-card">

              <span>✅</span>

              <div>

                <h3>
                  {
                    services.filter(
                      (service) =>
                        service.status === 'Active'
                    ).length
                  }
                </h3>

                <p>
                  Active Services
                </p>

              </div>

            </div>


            <div className="service-stat-card">

              <span>⏸️</span>

              <div>

                <h3>
                  {
                    services.filter(
                      (service) =>
                        service.status === 'Inactive'
                    ).length
                  }
                </h3>

                <p>
                  Inactive Services
                </p>

              </div>

            </div>


          </div>


          {/* Search */}

          <div className="service-search-box">

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Form */}

          {showForm && (

            <div className="service-form-card">


              <div className="service-form-header">

                <h2>
                  {editingId
                    ? 'Edit Service'
                    : 'Add New Service'}
                </h2>

                <button
                  onClick={() => setShowForm(false)}
                >
                  ✕
                </button>

              </div>


              <form onSubmit={handleSubmit}>


                <div className="service-form-grid">


                  {/* Service Name */}

                  <div className="form-group">

                    <label>
                      Service Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter service name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />

                  </div>


                  {/* Price */}

                  <div className="form-group">

                    <label>
                      Price *
                    </label>

                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                    />

                  </div>


                  {/* Rating */}

                  <div className="form-group">

                    <label>
                      Rating *
                    </label>

                    <input
                      type="number"
                      name="rating"
                      placeholder="Example: 4.5"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                    />

                    <small>
                      Enter rating between 0 and 5
                    </small>

                  </div>


                  {/* Rating Count */}

                  <div className="form-group">

                    <label>
                      Rating Count *
                    </label>

                    <input
                      type="number"
                      name="ratingCount"
                      placeholder="Example: 120"
                      value={formData.ratingCount}
                      onChange={handleInputChange}
                      min="0"
                    />

                    <small>
                      Number of customers who rated this service
                    </small>

                  </div>


                  {/* Description */}

                  <div className="form-group full-width">

                    <label>
                      Description *
                    </label>

                    <textarea
                      name="description"
                      placeholder="Enter service description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                    />

                  </div>


                  {/* Image URL */}

                  <div className="form-group">

                    <label>
                      Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      placeholder="Enter image URL"
                      value={formData.image}
                      onChange={handleInputChange}
                    />

                  </div>


                  {/* Status */}

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


                {/* Form Actions */}

                <div className="service-form-actions">

                  <button
                    type="button"
                    className="cancel-service-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="save-service-btn"
                  >
                    {editingId
                      ? 'Update Service'
                      : 'Add Service'}
                  </button>

                </div>


              </form>

            </div>

          )}


          {/* Services */}

          <div className="admin-services-grid">

            {filteredServices.length > 0 ? (

              filteredServices.map((service) => (

                <div
                  className="admin-service-card"
                  key={service.id}
                >


                  <div className="admin-service-image">

                    {service.image ? (

                      <img
                        src={service.image}
                        alt={service.name}
                      />

                    ) : (

                      <div className="no-service-image">
                        ❄️
                      </div>

                    )}


                    <span
                      className={
                        service.status === 'Active'
                          ? 'status-active'
                          : 'status-inactive'
                      }
                    >
                      {service.status}
                    </span>

                  </div>


                  <div className="admin-service-body">

                    <h3>
                      {service.name}
                    </h3>

                    <p>
                      {service.description}
                    </p>


                    {/* Rating */}

                    <div className="admin-service-rating">

                      ⭐ {Number(service.rating || 0).toFixed(1)}

                      <span>
                        ({service.ratingCount || 0} reviews)
                      </span>

                    </div>


                    <div className="admin-service-price">

                      ₹{service.price}

                    </div>


                    <div className="admin-service-actions">


                      <button
                        className="edit-service-btn"
                        onClick={() =>
                          handleEditService(service)
                        }
                      >
                        ✏️ Edit
                      </button>


                      <button
                        className="status-service-btn"
                        onClick={() =>
                          handleStatusChange(service.id)
                        }
                      >
                        {service.status === 'Active'
                          ? '⏸ Disable'
                          : '▶ Activate'}
                      </button>


                      <button
                        className="delete-service-btn"
                        onClick={() =>
                          handleDelete(service.id)
                        }
                      >
                        🗑 Delete
                      </button>


                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="no-services">

                <div>🔍</div>

                <h3>
                  No Services Found
                </h3>

                <p>
                  Try another search or add a new service.
                </p>

              </div>

            )}

          </div>


        </div>

      </main>

    </div>

  )

}

export default AdminServices