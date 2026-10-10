import { useLocation, useNavigate } from 'react-router-dom'
import './BookingSummary.css'

function BookingSummary() {

  const location = useLocation()
  const navigate = useNavigate()

  const booking = location.state?.booking

  if (!booking) {

    return (
      <div className="booking-summary-not-found">

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

  return (
    <div className="booking-summary-page">

      <main className="booking-summary-content">

        <div className="container">

          {/* ================================
              HEADER
          ================================= */}

          <div className="booking-summary-header">

            <p>
              BOOKING SUMMARY
            </p>

            <h1>
              Review Your Booking
            </h1>

            <span>
              Please check your booking details before continuing.
            </span>

          </div>


          <div className="booking-summary-layout">

            {/* ================================
                BOOKING DETAILS
            ================================= */}

            <div className="booking-summary-card">

              <h2>
                Service Details
              </h2>

              <div className="summary-row">

                <span>
                  Service
                </span>

                <strong>
                  {booking.serviceName}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Service Date
                </span>

                <strong>
                  {booking.date}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Service Time
                </span>

                <strong>
                  {booking.time}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Customer
                </span>

                <strong>
                  {booking.customerName}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Email
                </span>

                <strong>
                  {booking.customerEmail}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  City
                </span>

                <strong>
                  {booking.city}
                </strong>

              </div>


              <div className="summary-address">

                <span>
                  Service Address
                </span>

                <p>
                  {booking.address}
                </p>

              </div>

            </div>


            {/* ================================
                PRICE SUMMARY
            ================================= */}

            <div className="booking-price-card">

              <h2>
                Order Summary
              </h2>


              <div className="price-row">

                <span>
                  {booking.serviceName}
                </span>

                <strong>
                  ₹{booking.price}
                </strong>

              </div>


              <div className="price-row">

                <span>
                  Service Charge
                </span>

                <strong>
                  ₹0
                </strong>

              </div>


              <div className="price-divider"></div>


              <div className="total-price-row">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{booking.price}
                </strong>

              </div>


              {/* ================================
                  BOOKING STATUS
              ================================= */}

              <div className="summary-status">

                <span>
                  Booking Status
                </span>

                <strong>
                  {booking.status || 'Pending'}
                </strong>

              </div>


              {/* ================================
                  PAYMENT INFORMATION
              ================================= */}

              <div className="summary-payment-info">

                <span>
                  Payment
                </span>

                <strong>
                  Payment will be available after admin confirmation.
                </strong>

              </div>


              {/* ================================
                  BACK BUTTON
              ================================= */}

              <button
                className="back-summary-btn"
                onClick={() =>
                  navigate(-1)
                }
              >
                ← Back to Booking
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default BookingSummary