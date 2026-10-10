import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminDashboard.css'

function AdminDashboard() {

  const navigate = useNavigate()

  const adminName =
    localStorage.getItem('adminName') || 'Admin'

  const [servicesCount, setServicesCount] = useState(0)
  const [activeServices, setActiveServices] = useState(0)
  const [inactiveServices, setInactiveServices] = useState(0)

  const [customersCount, setCustomersCount] = useState(0)
  const [providersCount, setProvidersCount] = useState(0)
  const [bookingsCount, setBookingsCount] = useState(0)

  const [pendingBookings, setPendingBookings] = useState(0)
  const [confirmedBookings, setConfirmedBookings] = useState(0)
  const [completedBookings, setCompletedBookings] = useState(0)
  const [cancelledBookings, setCancelledBookings] = useState(0)

  const [reviewsCount, setReviewsCount] = useState(0)


  // =========================
  // Load Dashboard Data
  // =========================

  const loadDashboardData = async () => {

    try {

      /* =========================
         Services
      ========================= */

      const serviceResponse = await axios.get(
        'http://localhost:8080/api/services'
      )

      const services = serviceResponse.data || []

      setServicesCount(services.length)

      setActiveServices(
        services.filter(
          (service) =>
            service.status === 'Active'
        ).length
      )

      setInactiveServices(
        services.filter(
          (service) =>
            service.status === 'Inactive'
        ).length
      )


      /* =========================
         Customers
      ========================= */

      const customerResponse = await axios.get(
        'http://localhost:8080/api/customers'
      )

      const customers =
        customerResponse.data || []

      setCustomersCount(customers.length)


      /* =========================
         Providers
         Backend Connected
      ========================= */

      const providerResponse = await axios.get(
        'http://localhost:8080/api/providers'
      )

      const providers =
        providerResponse.data || []

      setProvidersCount(
        providers.length
      )


      /* =========================
         Bookings
      ========================= */

      const bookingResponse = await axios.get(
        'http://localhost:8080/api/bookings'
      )

      const bookings =
        bookingResponse.data || []

      setBookingsCount(
        bookings.length
      )

      setPendingBookings(
        bookings.filter(
          (booking) =>
            booking.status === 'Pending'
        ).length
      )

      setConfirmedBookings(
        bookings.filter(
          (booking) =>
            booking.status === 'Confirmed'
        ).length
      )

      setCompletedBookings(
        bookings.filter(
          (booking) =>
            booking.status === 'Completed'
        ).length
      )

      setCancelledBookings(
        bookings.filter(
          (booking) =>
            booking.status === 'Cancelled'
        ).length
      )


      /* =========================
         Reviews
      ========================= */

      const reviewResponse = await axios.get(
        'http://localhost:8080/api/reviews'
      )

      const reviews =
        reviewResponse.data || []

      setReviewsCount(
        reviews.length
      )

    } catch (error) {

      console.error(
        'Dashboard data loading error:',
        error
      )

    }
  }


  // =========================
  // Load Data
  // =========================

  useEffect(() => {

    loadDashboardData()


    window.addEventListener(
      'servicesUpdated',
      loadDashboardData
    )

    window.addEventListener(
      'customersUpdated',
      loadDashboardData
    )

    window.addEventListener(
      'providersUpdated',
      loadDashboardData
    )

    window.addEventListener(
      'bookingsUpdated',
      loadDashboardData
    )

    window.addEventListener(
      'reviewsUpdated',
      loadDashboardData
    )


    return () => {

      window.removeEventListener(
        'servicesUpdated',
        loadDashboardData
      )

      window.removeEventListener(
        'customersUpdated',
        loadDashboardData
      )

      window.removeEventListener(
        'providersUpdated',
        loadDashboardData
      )

      window.removeEventListener(
        'bookingsUpdated',
        loadDashboardData
      )

      window.removeEventListener(
        'reviewsUpdated',
        loadDashboardData
      )

    }

  }, [])


  return (
    <div className="admin-dashboard">

      <main className="admin-dashboard-content">

        <div className="container">


          {/* Welcome */}

          <div className="admin-welcome">

            <div>

              <p className="admin-dashboard-label">
                ADMIN DASHBOARD
              </p>

              <h1>
                Welcome back, {adminName}! 👋
              </h1>

              <p>
                Manage your AC services, customers,
                providers and bookings from your dashboard.
              </p>

            </div>


            <button
              className="admin-add-service-btn"
              onClick={() =>
                navigate('/admin-services')
              }
            >
              + Add Service
            </button>

          </div>


          {/* Statistics */}

          <div className="admin-stats-grid">


            {/* Services */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                ❄️
              </div>

              <div>

                <h3>
                  {servicesCount}
                </h3>

                <p>
                  Total Services
                </p>

              </div>

            </div>


            {/* Customers */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                👥
              </div>

              <div>

                <h3>
                  {customersCount}
                </h3>

                <p>
                  Total Customers
                </p>

              </div>

            </div>


            {/* Providers */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                🔧
              </div>

              <div>

                <h3>
                  {providersCount}
                </h3>

                <p>
                  Total Providers
                </p>

              </div>

            </div>


            {/* Bookings */}

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                📋
              </div>

              <div>

                <h3>
                  {bookingsCount}
                </h3>

                <p>
                  Total Bookings
                </p>

              </div>

            </div>

          </div>


          {/* Service Summary */}

          <section className="admin-management-section">

            <h2>
              Service Overview
            </h2>


            <div className="admin-management-grid">


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ❄️
                </span>

                <h3>
                  {servicesCount}
                </h3>

                <p>
                  Total Services
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-services')
                  }
                >
                  Manage Services →
                </button>

              </div>


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ✅
                </span>

                <h3>
                  {activeServices}
                </h3>

                <p>
                  Active Services
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-services')
                  }
                >
                  View Active →
                </button>

              </div>


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ⏸️
                </span>

                <h3>
                  {inactiveServices}
                </h3>

                <p>
                  Inactive Services
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-services')
                  }
                >
                  View Inactive →
                </button>

              </div>


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ➕
                </span>

                <h3>
                  Add New
                </h3>

                <p>
                  Create a new AC service.
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-services')
                  }
                >
                  Add Service →
                </button>

              </div>

            </div>

          </section>


          {/* Booking Overview */}

          <section className="admin-management-section">

            <h2>
              Booking Overview
            </h2>


            <div className="admin-management-grid">


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ⏳
                </span>

                <h3>
                  {pendingBookings}
                </h3>

                <p>
                  Pending Bookings
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-bookings')
                  }
                >
                  View Pending →
                </button>

              </div>


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ✅
                </span>

                <h3>
                  {confirmedBookings}
                </h3>

                <p>
                  Confirmed Bookings
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-bookings')
                  }
                >
                  View Confirmed →
                </button>

              </div>


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  🏁
                </span>

                <h3>
                  {completedBookings}
                </h3>

                <p>
                  Completed Bookings
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-bookings')
                  }
                >
                  View Completed →
                </button>

              </div>


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ❌
                </span>

                <h3>
                  {cancelledBookings}
                </h3>

                <p>
                  Cancelled Bookings
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-bookings')
                  }
                >
                  View Cancelled →
                </button>

              </div>

            </div>

          </section>


          {/* Reviews Overview */}

          <section className="admin-management-section">

            <h2>
              Reviews Overview
            </h2>


            <div className="admin-management-grid">


              <div className="admin-management-card">

                <span className="admin-management-icon">
                  ⭐
                </span>

                <h3>
                  {reviewsCount}
                </h3>

                <p>
                  Total Reviews
                </p>

                <button
                  onClick={() =>
                    navigate('/admin-reviews')
                  }
                >
                  View Reviews →
                </button>

              </div>

            </div>

          </section>


          {/* Management */}

          <section className="admin-management-section">

            <h2>
              Management
            </h2>


            <div className="admin-management-grid">


              <div
                className="admin-management-card"
                onClick={() =>
                  navigate('/admin-services')
                }
              >

                <span className="admin-management-icon">
                  ❄️
                </span>

                <h3>
                  Manage Services
                </h3>

                <p>
                  Add, edit and remove AC services.
                </p>

                <button>
                  Manage Services →
                </button>

              </div>


              <div
                className="admin-management-card"
                onClick={() =>
                  navigate('/admin-customers')
                }
              >

                <span className="admin-management-icon">
                  👥
                </span>

                <h3>
                  Manage Customers
                </h3>

                <p>
                  View and manage registered customers.
                </p>

                <button>
                  View Customers →
                </button>

              </div>


              <div
                className="admin-management-card"
                onClick={() =>
                  navigate('/admin-providers')
                }
              >

                <span className="admin-management-icon">
                  🔧
                </span>

                <h3>
                  Manage Providers
                </h3>

                <p>
                  Manage service providers and their details.
                </p>

                <button>
                  View Providers →
                </button>

              </div>


              <div
                className="admin-management-card"
                onClick={() =>
                  navigate('/admin-bookings')
                }
              >

                <span className="admin-management-icon">
                  📋
                </span>

                <h3>
                  Manage Bookings
                </h3>

                <p>
                  View and manage customer bookings.
                </p>

                <button>
                  View Bookings →
                </button>

              </div>

            </div>

          </section>


          {/* Recent Activity */}

          <section className="admin-recent-section">

            <div className="admin-section-header">

              <div>

                <p className="admin-section-label">
                  ACTIVITY
                </p>

                <h2>
                  Recent Activity
                </h2>

              </div>

            </div>


            <div className="admin-empty-state">

              <div className="admin-empty-icon">
                📊
              </div>

              <h3>
                No Recent Activity
              </h3>

              <p>
                Recent customer bookings and service
                activities will appear here.
              </p>

            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard