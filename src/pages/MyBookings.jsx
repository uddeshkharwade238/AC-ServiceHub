import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './MyBookings.css'
import ReviewModal from './ReviewModal'

function MyBookings() {

  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [reviewedBookingIds, setReviewedBookingIds] = useState([])

  // ================================
  // CURRENT CUSTOMER
  // ================================

  const customer = JSON.parse(
    localStorage.getItem('customer') || 'null'
  )

  // ================================
  // LOAD CUSTOMER BOOKINGS
  // ================================

  const loadBookings = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8080/api/bookings'
      )

      const allBookings = response.data

      const customerBookings = allBookings.filter(
        (booking) =>
          (
            customer?.id &&
            booking.customerId === customer.id
          ) ||
          (
            customer?.email &&
            booking.customerEmail === customer.email
          )
      )

      setBookings(customerBookings)

    } catch (error) {

      console.error(
        'Error loading bookings:',
        error
      )

      alert('Unable to load bookings')

    }
  }

  // ================================
  // LOAD REVIEWS FROM BACKEND
  // ================================

  const loadReviews = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8080/api/reviews'
      )

      const allReviews = response.data

      const customerReviews = allReviews.filter(
        (review) =>
          (
            customer?.id &&
            review.customerId === customer.id
          ) ||
          (
            customer?.email &&
            review.customerEmail === customer.email
          )
      )

      const bookingIds = customerReviews.map(
        (review) => review.bookingId
      )

      setReviewedBookingIds(bookingIds)

    } catch (error) {

      console.error(
        'Error loading reviews:',
        error
      )

    }
  }

  // ================================
  // LISTEN FOR UPDATES
  // ================================

  useEffect(() => {

    loadBookings()
    loadReviews()

    const handleBookingsUpdated = () => {
      loadBookings()
    }

    const handleReviewsUpdated = () => {
      loadReviews()
    }

    window.addEventListener(
      'bookingsUpdated',
      handleBookingsUpdated
    )

    window.addEventListener(
      'reviewsUpdated',
      handleReviewsUpdated
    )

    return () => {

      window.removeEventListener(
        'bookingsUpdated',
        handleBookingsUpdated
      )

      window.removeEventListener(
        'reviewsUpdated',
        handleReviewsUpdated
      )

    }

  }, [customer?.id, customer?.email])

  // ================================
  // OPEN REVIEW MODAL
  // ================================

  const handleGiveReview = (booking) => {

    if (reviewedBookingIds.includes(booking.id)) {

      alert('You have already submitted a review for this booking.')

      return
    }

    setSelectedBooking(booking)
    setShowReviewModal(true)

  }

  // ================================
  // CLOSE REVIEW MODAL
  // ================================

  const handleCloseReview = () => {

    setShowReviewModal(false)
    setSelectedBooking(null)

  }

  // ================================
  // REVIEW SUBMITTED
  // ================================

  const handleReviewSubmitted = async (newReview) => {

    if (newReview?.bookingId) {

      setReviewedBookingIds((previousIds) => {

        if (previousIds.includes(newReview.bookingId)) {
          return previousIds
        }

        return [
          ...previousIds,
          newReview.bookingId
        ]

      })

    }

    await loadReviews()

    setShowReviewModal(false)
    setSelectedBooking(null)

  }

  // ================================
  // CANCEL BOOKING
  // ONLY BEFORE ADMIN CONFIRMATION
  // ================================

  const handleCancel = async (id) => {

    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking?'
    )

    if (!confirmCancel) {
      return
    }

    try {

      const response = await axios.get(
        `http://localhost:8080/api/bookings/${id}`
      )

      const booking = response.data

      if (!booking) {
        alert('Booking not found')
        return
      }

      if (booking.status !== 'Pending') {

        alert(
          'This booking cannot be cancelled after admin confirmation.'
        )

        return
      }

      const updatedBooking = {
        ...booking,
        status: 'Cancelled'
      }

      await axios.post(
        'http://localhost:8080/api/bookings',
        updatedBooking
      )

      await loadBookings()

      window.dispatchEvent(
        new Event('bookingsUpdated')
      )

      alert(
        'Booking cancelled successfully!'
      )

    } catch (error) {

      console.error(
        'Error cancelling booking:',
        error
      )

      alert(
        'Unable to cancel booking'
      )

    }
  }

  // ================================
  // DELETE BOOKING
  // ONLY COMPLETED / CANCELLED
  // ================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    )

    if (!confirmDelete) {
      return
    }

    try {

      const response = await axios.get(
        `http://localhost:8080/api/bookings/${id}`
      )

      const booking = response.data

      if (!booking) {
        alert('Booking not found')
        return
      }

      if (
        booking.status !== 'Completed' &&
        booking.status !== 'Cancelled'
      ) {

        alert(
          'Only completed or cancelled bookings can be deleted.'
        )

        return
      }

      await axios.delete(
        `http://localhost:8080/api/bookings/${id}`
      )

      await loadBookings()

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
  // PAYMENT
  // CONFIRMED → PAY NOW
  // ================================

  const handlePayNow = (booking) => {

    navigate('/payment', {
      state: {
        booking: booking
      }
    })

  }

  // ================================
  // BOOKING COUNTS
  // ================================

  const totalBookings =
    bookings.length

  const activeBookings =
    bookings.filter(
      (booking) =>
        booking.status === 'Pending' ||
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

    <div className="my-bookings-page">

      <main className="my-bookings-content">

        <div className="container">

          {/* HEADER */}

          <div className="my-bookings-header">

            <p className="my-bookings-label">
              MY BOOKINGS
            </p>

            <h1>
              Your Service Bookings
            </h1>

            <p>
              View and manage all your AC service bookings.
            </p>

          </div>


          {/* STATISTICS */}

          <div className="my-bookings-stats">

            <div className="my-booking-stat-card">

              <div className="my-booking-stat-icon">
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


            <div className="my-booking-stat-card">

              <div className="my-booking-stat-icon">
                🔄
              </div>

              <div>

                <h3>
                  {activeBookings}
                </h3>

                <p>
                  Active
                </p>

              </div>

            </div>


            <div className="my-booking-stat-card">

              <div className="my-booking-stat-icon">
                ✅
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


            <div className="my-booking-stat-card">

              <div className="my-booking-stat-icon">
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


          {/* BOOKINGS LIST */}

          {bookings.length > 0 ? (

            <div className="my-bookings-list">

              {bookings
                .slice()
                .reverse()
                .map((booking) => (

                  <div
                    className="my-booking-card"
                    key={booking.id}
                  >

                    {/* TOP */}

                    <div className="my-booking-top">

                      <div>

                        <span className="booking-small-label">
                          BOOKING ID
                        </span>

                        <strong>
                          #{booking.id}
                        </strong>

                      </div>


                      <span
                        className={`my-booking-status ${
                          booking.status?.toLowerCase()
                        }`}
                      >
                        {booking.status || 'Pending'}
                      </span>

                    </div>


                    {/* MAIN */}

                    <div className="my-booking-main">

                      <div className="my-booking-service">

                        <div className="my-booking-service-icon">
                          ❄️
                        </div>

                        <div>

                          <span>
                            AC SERVICE
                          </span>

                          <h2>
                            {booking.serviceName}
                          </h2>

                          <p>
                            Professional AC service
                          </p>

                        </div>

                      </div>


                      <div className="my-booking-price">

                        <span>
                          Total Amount
                        </span>

                        <strong>
                          ₹{booking.price}
                        </strong>

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="my-booking-details">

                      <div className="my-booking-detail">

                        <span>
                          📅 Date
                        </span>

                        <strong>
                          {booking.date}
                        </strong>

                      </div>


                      <div className="my-booking-detail">

                        <span>
                          🕐 Time
                        </span>

                        <strong>
                          {booking.time}
                        </strong>

                      </div>


                      <div className="my-booking-detail">

                        <span>
                          📍 City
                        </span>

                        <strong>
                          {booking.city}
                        </strong>

                      </div>


                      <div className="my-booking-detail">

                        <span>
                          💳 Payment
                        </span>

                        <strong>
                          {booking.paymentMethod ||
                            'Not Available'}
                        </strong>

                      </div>

                    </div>


                    {/* PAYMENT STATUS */}

                    <div className="my-booking-payment">

                      <div>

                        <span>
                          Payment Status
                        </span>

                        <strong
                          className={
                            booking.paymentStatus === 'Paid'
                              ? 'payment-paid'
                              : 'payment-pending'
                          }
                        >
                          {booking.paymentStatus ||
                            'Pending'}
                        </strong>

                      </div>


                      <div className="my-booking-address">

                        <span>
                          Service Address
                        </span>

                        <strong>
                          {booking.address}
                        </strong>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="my-booking-actions">

                      {/* CONFIRMED → PAY NOW */}

                      {booking.status === 'Confirmed' &&
                        booking.paymentStatus !== 'Paid' && (

                          <button
                            className="pay-now-btn"
                            onClick={() =>
                              handlePayNow(booking)
                            }
                          >
                            💳 Pay Now
                          </button>

                      )}


                      {/* PENDING → CANCEL */}

                      {booking.status === 'Pending' && (

                        <button
                          className="cancel-booking-btn"
                          onClick={() =>
                            handleCancel(booking.id)
                          }
                        >
                          Cancel Booking
                        </button>

                      )}


                      {/* COMPLETED → GIVE REVIEW */}

                      {booking.status === 'Completed' &&
                        !reviewedBookingIds.includes(
                          booking.id
                        ) && (

                          <button
                            className="give-review-btn"
                            onClick={() =>
                              handleGiveReview(booking)
                            }
                          >
                            ⭐ Give Review
                          </button>

                        )}


                      {/* COMPLETED → REVIEW SUBMITTED */}

                      {booking.status === 'Completed' &&
                        reviewedBookingIds.includes(
                          booking.id
                        ) && (

                          <span className="review-submitted">
                            ⭐ Review Submitted
                          </span>

                        )}


                      {/* COMPLETED / CANCELLED → DELETE */}

                      {(
                        booking.status === 'Completed' ||
                        booking.status === 'Cancelled'
                      ) && (

                        <button
                          className="delete-my-booking-btn"
                          onClick={() =>
                            handleDelete(booking.id)
                          }
                        >
                          Delete
                        </button>

                      )}


                      {/* BOOK ANOTHER */}

                      <button
                        className="book-another-btn"
                        onClick={() =>
                          navigate('/customer-services')
                        }
                      >
                        Book Another Service
                      </button>

                    </div>

                  </div>

                ))}

            </div>

          ) : (

            /* EMPTY STATE */

            <div className="my-bookings-empty">

              <div className="my-bookings-empty-icon">
                📋
              </div>

              <h2>
                No Bookings Yet
              </h2>

              <p>
                You haven't booked any AC service yet.
                Start by choosing a service.
              </p>

              <button
                onClick={() =>
                  navigate('/customer-services')
                }
              >
                Browse Services
              </button>

            </div>

          )}

        </div>

      </main>


      {/* REVIEW MODAL */}

      {showReviewModal && selectedBooking && (

        <ReviewModal
          booking={selectedBooking}
          onClose={handleCloseReview}
          onReviewSubmitted={handleReviewSubmitted}
        />

      )}

    </div>
  )
}

export default MyBookings