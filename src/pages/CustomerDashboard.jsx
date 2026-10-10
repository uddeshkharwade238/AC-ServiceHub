import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './CustomerDashboard.css'

function CustomerDashboard() {

  const navigate = useNavigate()

  const customer = JSON.parse(
    localStorage.getItem('customer') || 'null'
  )

  const customerName = customer?.name || 'Customer'

  const [bookingStats, setBookingStats] = useState({
    total: 0,
    active: 0,
    completed: 0
  })


  // =================================
  // LOAD BOOKING STATS FROM BACKEND
  // =================================

  const loadBookingStats = async () => {

    if (!customer?.id && !customer?.email) {
      return
    }

    try {

      const response = await axios.get(
        'http://localhost:8080/api/bookings'
      )

      const allBookings = response.data || []


      // Only current customer's bookings
      const customerBookings = allBookings.filter(
        (booking) =>
          (customer?.id &&
            booking.customerId === customer.id) ||
          (customer?.email &&
            booking.customerEmail === customer.email)
      )


      const total = customerBookings.length


      const active = customerBookings.filter(
        (booking) =>
          booking.status === 'Pending' ||
          booking.status === 'Confirmed'
      ).length


      const completed = customerBookings.filter(
        (booking) =>
          booking.status === 'Completed'
      ).length


      setBookingStats({
        total,
        active,
        completed
      })

    } catch (error) {

      console.error(
        'Error loading booking stats:',
        error
      )

      setBookingStats({
        total: 0,
        active: 0,
        completed: 0
      })

    }
  }


  // =================================
  // LOAD + UPDATE DASHBOARD
  // =================================

  useEffect(() => {

    loadBookingStats()


    const handleBookingsUpdated = () => {
      loadBookingStats()
    }


    window.addEventListener(
      'bookingsUpdated',
      handleBookingsUpdated
    )


    return () => {

      window.removeEventListener(
        'bookingsUpdated',
        handleBookingsUpdated
      )

    }

  }, [customer?.id, customer?.email])


  return (

    <div className="customer-dashboard">

      {/* DASHBOARD CONTENT */}

      <main className="customer-dashboard-content">

        <div className="container">


          {/* Welcome Section */}

          <div className="customer-welcome">

            <div>

              <p className="dashboard-label">
                CUSTOMER DASHBOARD
              </p>

              <h1>
                Welcome back, {customerName}! 👋
              </h1>

              <p>
                Manage your AC services, bookings and account
                from your dashboard.
              </p>

            </div>


            <button
              className="book-service-btn"
              onClick={() =>
                navigate('/customer-services')
              }
            >
              + Book AC Service
            </button>

          </div>


          {/* Dashboard Stats */}

          <div className="dashboard-stats">


            {/* Total Bookings */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                📋
              </div>

              <div>

                <h3>
                  {bookingStats.total}
                </h3>

                <p>
                  Total Bookings
                </p>

              </div>

            </div>


            {/* Active Bookings */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                🔧
              </div>

              <div>

                <h3>
                  {bookingStats.active}
                </h3>

                <p>
                  Active Bookings
                </p>

              </div>

            </div>


            {/* Completed Bookings */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                ✅
              </div>

              <div>

                <h3>
                  {bookingStats.completed}
                </h3>

                <p>
                  Completed
                </p>

              </div>

            </div>

          </div>


          {/* Quick Actions */}

          <section className="quick-section">

            <h2>
              Quick Actions
            </h2>


            <div className="quick-actions">


              {/* Book Service */}

              <div
                className="quick-card"
                onClick={() =>
                  navigate('/customer-services')
                }
              >

                <span>
                  ❄️
                </span>

                <h3>
                  Book AC Service
                </h3>

                <p>
                  Choose an AC service and book an
                  appointment.
                </p>

              </div>


              {/* My Bookings */}

              <div
                className="quick-card"
                onClick={() =>
                  navigate('/my-bookings')
                }
              >

                <span>
                  📋
                </span>

                <h3>
                  My Bookings
                </h3>

                <p>
                  View and manage your service bookings.
                </p>

              </div>


              {/* Profile */}

              <div
                className="quick-card"
                onClick={() =>
                  navigate('/profile')
                }
              >

                <span>
                  👤
                </span>

                <h3>
                  My Profile
                </h3>

                <p>
                  View and update your account information.
                </p>

              </div>


            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default CustomerDashboard