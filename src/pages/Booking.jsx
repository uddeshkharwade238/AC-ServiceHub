import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Booking.css'

function Booking() {

  const navigate = useNavigate()
  const location = useLocation()

  const service = location.state?.service

  const customer = JSON.parse(
    localStorage.getItem('customer') || 'null'
  )

  if (!customer || localStorage.getItem('userRole') !== 'customer') {
    navigate('/login')
    return null
  }

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    city: '',
    pincode: ''
  })

  if (!service) {

    return (
      <div className="booking-not-found">

        <h2>
          Service information not found
        </h2>

        <button
          onClick={() =>
            navigate('/customer-services')
          }
        >
          Back to Services
        </button>

      </div>
    )
  }

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (
      !formData.date ||
      !formData.time ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      alert('Please fill all fields')
      return
    }

    if (formData.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode')
      return
    }

    const bookingData = {

      customerId: customer?.id || null,

      customerName:
        customer?.name || 'Customer',

      customerEmail:
        customer?.email || '',

      serviceId: service.id,

      serviceName: service.name,

      price: Number(service.price),

      date: formData.date,

      time: formData.time,

      address: formData.address,

      city: formData.city,

      pincode: formData.pincode,

      status: 'Pending'

    }

    try {

      const response = await axios.post(
        'http://localhost:8080/api/bookings',
        bookingData
      )

      const savedBooking = response.data

      console.log('Booking saved:', savedBooking)

      alert('Booking created successfully')

      navigate('/booking-summary', {
        state: {
          booking: savedBooking
        }
      })

    } catch (error) {

      console.error('Error creating booking:', error)

      alert('Unable to create booking. Please try again.')

    }
  }

  return (
    <div className="booking-page">

      <main className="booking-content">

        <div className="container">

          <div className="booking-header">

            <p className="booking-label">
              BOOK AC SERVICE
            </p>

            <h1>
              Schedule Your Service
            </h1>

            <p>
              Enter your service details and choose
              your preferred appointment time.
            </p>

          </div>

          <div className="booking-layout">

            {/* Form */}

            <div className="booking-form-card">

              <h2>
                Booking Details
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="booking-form-grid">

                  <div className="form-group">

                    <label>
                      Service
                    </label>

                    <input
                      type="text"
                      value={service.name}
                      readOnly
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Price
                    </label>

                    <input
                      type="text"
                      value={`₹${service.price}`}
                      readOnly
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Preferred Date *
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      min={
                        new Date()
                          .toISOString()
                          .split('T')[0]
                      }
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Preferred Time *
                    </label>

                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select time
                      </option>

                      <option value="09:00 AM">
                        09:00 AM
                      </option>

                      <option value="11:00 AM">
                        11:00 AM
                      </option>

                      <option value="01:00 PM">
                        01:00 PM
                      </option>

                      <option value="03:00 PM">
                        03:00 PM
                      </option>

                      <option value="05:00 PM">
                        05:00 PM
                      </option>

                      <option value="07:00 PM">
                        07:00 PM
                      </option>

                    </select>

                  </div>

                  <div className="form-group full-width">

                    <label>
                      Service Address *
                    </label>

                    <textarea
                      name="address"
                      rows="3"
                      placeholder="Enter complete service address"
                      value={formData.address}
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Pincode *
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      placeholder="Enter 6-digit pincode"
                      maxLength="6"
                      value={formData.pincode}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <div className="booking-form-actions">

                  <button
                    type="button"
                    className="booking-back-btn"
                    onClick={() =>
                      navigate(-1)
                    }
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="booking-continue-btn"
                  >
                    Continue →
                  </button>

                </div>

              </form>

            </div>

            {/* Service Summary */}

            <div className="booking-service-card">

              <div className="booking-service-image">

                {service.image ? (

                  <img
                    src={service.image}
                    alt={service.name}
                  />

                ) : (

                  <div>
                    ❄️
                  </div>

                )}

              </div>

              <div className="booking-service-info">

                <p>
                  SELECTED SERVICE
                </p>

                <h2>
                  {service.name}
                </h2>

                <span>
                  Professional AC service
                </span>

                <div className="booking-service-price">
                  ₹{service.price}
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Booking