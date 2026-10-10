import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './PaymentSuccess.css'

function PaymentSuccess() {

  const location = useLocation()
  const navigate = useNavigate()

  const booking = location.state?.booking

  const paymentMethod =
    location.state?.paymentMethod || 'Online Payment'

  const paymentId =
    location.state?.paymentId || ''

  const [saving, setSaving] = useState(true)
  const [saveError, setSaveError] = useState('')


  useEffect(() => {

    if (!booking || !booking.id) {
      setSaving(false)
      return
    }

    const savePaymentToBackend = async () => {

      try {

        const updatedBooking = {
          ...booking,

          paymentMethod: paymentMethod,

          paymentStatus:
            paymentMethod === 'Pay After Service'
              ? 'Pending'
              : 'Paid',

          razorpayPaymentId: paymentId || null
        }

        await axios.post(
          `http://localhost:8080/api/bookings`,
          updatedBooking
        )

        setSaving(false)

      } catch (error) {

        console.error(
          'Payment details save error:',
          error
        )

        setSaveError(
          'Payment was successful, but payment details could not be saved to the server.'
        )

        setSaving(false)
      }
    }

    savePaymentToBackend()

  }, [booking, paymentMethod, paymentId])


  if (!booking) {

    return (
      <div className="payment-success-not-found">

        <h2>
          Booking information not found
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


  const handleMyBookings = () => {
    navigate('/my-bookings')
  }


  const handleDashboard = () => {
    navigate('/customer-dashboard')
  }


  return (
    <div className="payment-success-page">

      <main className="payment-success-content">

        <div className="container">

          <div className="success-card">

            {/* Success Icon */}

            <div className="success-icon">
              ✓
            </div>


            <p className="success-label">
              PAYMENT SUCCESSFUL
            </p>


            <h1>
              Your Payment is Successful!
            </h1>


            <p className="success-message">
              Your payment has been successfully completed.
              Your booking payment details have been saved.
            </p>


            {/* Saving Status */}

            {saving && (
              <div className="success-status">

                <span>
                  ⏳
                </span>

                <div>

                  <strong>
                    Saving Payment Details...
                  </strong>

                  <p>
                    Please wait while we save your payment
                    information.
                  </p>

                </div>

              </div>
            )}


            {/* Save Error */}

            {saveError && (
              <div className="success-status">

                <span>
                  ⚠️
                </span>

                <div>

                  <strong>
                    Payment Save Warning
                  </strong>

                  <p>
                    {saveError}
                  </p>

                </div>

              </div>
            )}


            {/* Booking ID */}

            <div className="booking-id-box">

              <span>
                Booking ID
              </span>

              <strong>
                #{booking.id}
              </strong>

            </div>


            {/* Booking Details */}

            <div className="success-details">

              <h2>
                Booking Details
              </h2>


              <div className="success-detail-row">

                <span>
                  Customer
                </span>

                <strong>
                  {booking.customerName}
                </strong>

              </div>


              <div className="success-detail-row">

                <span>
                  Service
                </span>

                <strong>
                  {booking.serviceName}
                </strong>

              </div>


              <div className="success-detail-row">

                <span>
                  Date
                </span>

                <strong>
                  {booking.date}
                </strong>

              </div>


              <div className="success-detail-row">

                <span>
                  Time
                </span>

                <strong>
                  {booking.time}
                </strong>

              </div>


              <div className="success-detail-row">

                <span>
                  City
                </span>

                <strong>
                  {booking.city}
                </strong>

              </div>


              <div className="success-detail-row">

                <span>
                  Payment Method
                </span>

                <strong>
                  {paymentMethod}
                </strong>

              </div>


              <div className="success-detail-row">

                <span>
                  Payment Status
                </span>

                <strong>
                  {paymentMethod === 'Pay After Service'
                    ? 'Pending'
                    : 'Paid'}
                </strong>

              </div>


              {paymentId && (
                <div className="success-detail-row">

                  <span>
                    Payment ID
                  </span>

                  <strong>
                    {paymentId}
                  </strong>

                </div>
              )}


              <div className="success-detail-row">

                <span>
                  Booking Status
                </span>

                <strong>
                  {booking.status}
                </strong>

              </div>


              <div className="success-detail-row total-row">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{booking.price}
                </strong>

              </div>

            </div>


            {/* Status */}

            <div className="success-status">

              <span>
                ✓
              </span>

              <div>

                <strong>
                  Payment Status: {
                    paymentMethod === 'Pay After Service'
                      ? 'Pending'
                      : 'Paid'
                  }
                </strong>

                <p>
                  {paymentMethod === 'Pay After Service'
                    ? 'You selected Pay After Service.'
                    : 'Your Razorpay test payment was completed successfully.'}
                </p>

              </div>

            </div>


            {/* Buttons */}

            <div className="success-actions">

              <button
                className="my-bookings-btn"
                onClick={handleMyBookings}
              >
                View My Bookings
              </button>


              <button
                className="dashboard-btn"
                onClick={handleDashboard}
              >
                Go to Dashboard
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default PaymentSuccess