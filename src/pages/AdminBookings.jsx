import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminBookings.css'

function AdminBookings() {

  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // ================================
  // LOAD BOOKINGS FROM BACKEND
  // ================================

  const loadBookings = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8080/api/bookings'
      )

      setBookings(response.data)

    } catch (error) {

      console.error(
        'Error loading bookings:',
        error
      )

      alert('Unable to load bookings')

    }
  }

  useEffect(() => {

    loadBookings()

    const handleBookingsUpdated = () => {
      loadBookings()
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

  }, [])

  // ================================
  // CHANGE BOOKING STATUS
  // ================================

  const handleStatusChange = async (
    booking,
    newStatus
  ) => {

    const currentStatus =
      booking.status || 'Pending'

    // Prevent changing Cancelled booking
    if (currentStatus === 'Cancelled') {

      alert(
        'Cancelled booking cannot be changed.'
      )

      return
    }

    // Prevent changing Completed booking
    if (currentStatus === 'Completed') {

      alert(
        'Completed booking cannot be changed.'
      )

      return
    }

    // Pending → Completed is not allowed
    if (
      currentStatus === 'Pending' &&
      newStatus === 'Completed'
    ) {

      alert(
        'Please confirm the booking before marking it as completed.'
      )

      return
    }

    try {

      const updatedBooking = {
        ...booking,
        status: newStatus
      }

      const response = await axios.post(
        'http://localhost:8080/api/bookings',
        updatedBooking
      )

      const savedBooking = response.data

      const updatedBookings = bookings.map(
        (item) =>
          item.id === savedBooking.id
            ? savedBooking
            : item
      )

      setBookings(updatedBookings)

      window.dispatchEvent(
        new Event('bookingsUpdated')
      )

      alert(
        `Booking status changed to ${newStatus}`
      )

    } catch (error) {

      console.error(
        'Error updating booking status:',
        error
      )

      alert(
        'Unable to update booking status'
      )

    }
  }

  // ================================
  // DELETE BOOKING
  // ================================

  const handleDelete = async (booking) => {

    // Admin can delete only Completed
    // or Cancelled bookings

    if (
      booking.status !== 'Completed' &&
      booking.status !== 'Cancelled'
    ) {

      alert(
        'Only completed or cancelled bookings can be deleted.'
      )

      return
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    )

    if (!confirmDelete) {
      return
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/bookings/${booking.id}`
      )

      const updatedBookings = bookings.filter(
        (item) => item.id !== booking.id
      )

      setBookings(updatedBookings)

      window.dispatchEvent(
        new Event('bookingsUpdated')
      )

      alert(
        'Booking deleted successfully!'
      )

    } catch (error) {

      console.error(
        'Error deleting booking:',
        error
      )

      alert(
        'Unable to delete booking'
      )

    }
  }

  // ================================
  // SEARCH + FILTER
  // ================================

  const filteredBookings = bookings.filter(
    (booking) => {

      const searchText =
        search.toLowerCase().trim()

      const matchesSearch =
        booking.customerName
          ?.toLowerCase()
          .includes(searchText) ||

        booking.customerEmail
          ?.toLowerCase()
          .includes(searchText) ||

        booking.serviceName
          ?.toLowerCase()
          .includes(searchText) ||

        booking.city
          ?.toLowerCase()
          .includes(searchText)

      const matchesStatus =
        statusFilter === 'All' ||
        booking.status === statusFilter

      return (
        matchesSearch &&
        matchesStatus
      )
    }
  )

  // ================================
  // STATISTICS
  // ================================

  const totalBookings =
    bookings.length

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === 'Pending'
    ).length

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === 'Confirmed'
    ).length

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === 'Completed'
    ).length

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status === 'Cancelled'
    ).length

  return (

    <div className="admin-bookings-page">

      <main className="admin-bookings-content">

        <div className="container">

          {/* ================================
              HEADER
          ================================= */}

          <div className="admin-bookings-header">

            <div>

              <p className="admin-bookings-label">
                BOOKING MANAGEMENT
              </p>

              <h1>
                Customer Bookings
              </h1>

              <p>
                View and manage all customer AC
                service bookings.
              </p>

            </div>

          </div>

          {/* ================================
              STATISTICS
          ================================= */}

          <div className="booking-stats-grid">

            {/* Total */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                📋
              </div>

              <div>

                <h3>
                  {totalBookings}
                </h3>

                <p>
                  Total Bookings
                </p>

              </div>

            </div>

            {/* Pending */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                ⏳
              </div>

              <div>

                <h3>
                  {pendingBookings}
                </h3>

                <p>
                  Pending
                </p>

              </div>

            </div>

            {/* Confirmed */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                ✅
              </div>

              <div>

                <h3>
                  {confirmedBookings}
                </h3>

                <p>
                  Confirmed
                </p>

              </div>

            </div>

            {/* Completed */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                🎉
              </div>

              <div>

                <h3>
                  {completedBookings}
                </h3>

                <p>
                  Completed
                </p>

              </div>

            </div>

            {/* Cancelled */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                ❌
              </div>

              <div>

                <h3>
                  {cancelledBookings}
                </h3>

                <p>
                  Cancelled
                </p>

              </div>

            </div>

          </div>

          {/* ================================
              SEARCH + FILTER
          ================================= */}

          <div className="admin-bookings-toolbar">

            <input
              type="text"
              placeholder="Search customer, email, service or city..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

          {/* ================================
              BOOKINGS TABLE
          ================================= */}

          {filteredBookings.length > 0 ? (

            <div className="admin-bookings-table-wrapper">

              <table className="admin-bookings-table">

                <thead>

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Service
                    </th>

                    <th>
                      Date & Time
                    </th>

                    <th>
                      City
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Payment
                    </th>

                    <th>
                      Booking Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredBookings.map(
                    (booking, index) => (

                      <tr
                        key={booking.id}
                      >

                        {/* Number */}

                        <td>
                          {index + 1}
                        </td>

                        {/* Customer */}

                        <td>

                          <div className="booking-customer">

                            <strong>
                              {booking.customerName}
                            </strong>

                            <span>
                              {booking.customerEmail}
                            </span>

                          </div>

                        </td>

                        {/* Service */}

                        <td>
                          {booking.serviceName}
                        </td>

                        {/* Date + Time */}

                        <td>

                          <div className="booking-date-time">

                            <strong>
                              {booking.date}
                            </strong>

                            <span>
                              {booking.time}
                            </span>

                          </div>

                        </td>

                        {/* City */}

                        <td>
                          {booking.city}
                        </td>

                        {/* Amount */}

                        <td>

                          <strong className="booking-amount">
                            ₹{booking.price}
                          </strong>

                        </td>

                        {/* Payment */}

                        <td>

                          <div className="payment-info">

                            <strong>
                              {booking.paymentMethod ||
                                'Not Available'}
                            </strong>

                            <span
                              className={
                                booking.paymentStatus === 'Paid'
                                  ? 'payment-paid'
                                  : 'payment-pending'
                              }
                            >
                              {booking.paymentStatus ||
                                'Pending'}
                            </span>

                          </div>

                        </td>

                        {/* Booking Status */}

                        <td>

                          <select
                            className={`booking-status-select ${booking.status?.toLowerCase()}`}
                            value={
                              booking.status ||
                              'Pending'
                            }
                            disabled={
                              booking.status === 'Completed' ||
                              booking.status === 'Cancelled'
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                booking,
                                e.target.value
                              )
                            }
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                        </td>

                        {/* Action */}

                        <td>

                          <button
                            className="delete-booking-btn"
                            disabled={
                              booking.status !== 'Completed' &&
                              booking.status !== 'Cancelled'
                            }
                            onClick={() =>
                              handleDelete(booking)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="admin-bookings-empty">

              <div className="admin-bookings-empty-icon">
                📋
              </div>

              <h2>
                No Bookings Found
              </h2>

              <p>
                Customer bookings will appear here
                after a service is booked.
              </p>

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default AdminBookings