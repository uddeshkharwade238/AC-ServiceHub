import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Payment.css'

function Payment() {

  const location = useLocation()
  const navigate = useNavigate()

  const booking = location.state?.booking

  const [paymentMethod, setPaymentMethod] = useState('')

  if (!booking) {
    return (
      <div className="payment-not-found">

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

  // ================================
  // SELECT PAYMENT METHOD
  // ================================

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method)
  }

  // ================================
  // PAY AFTER SERVICE
  // ================================

  const handlePayAfterService = () => {

    const updatedBooking = {
      ...booking,
      paymentMethod: 'Pay After Service',
      paymentStatus: 'Pending'
    }

    navigate('/payment-success', {
      state: {
        booking: updatedBooking,
        paymentMethod: 'Pay After Service'
      }
    })
  }

  // ================================
  // RAZORPAY PAYMENT
  // ================================

  const handleRazorpayPayment = () => {

    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    if (paymentMethod === 'pay-after-service') {
      handlePayAfterService()
      return
    }

    // Razorpay script check

    if (!window.Razorpay) {

      alert(
        'Razorpay is not loaded. Please add the Razorpay script in index.html.'
      )

      return
    }

    const options = {

      key: 'rzp_test_TlonNcC9lTM8Y3',

      amount: Math.round(
        Number(booking.price) * 100
      ),

      currency: 'INR',

      name: 'AC ServiceHub',

      description:
        `Payment for ${booking.serviceName}`,

      prefill: {
        name: booking.customerName || '',
        email: booking.customerEmail || ''
      },

      notes: {
        bookingId: String(booking.id),
        serviceName: booking.serviceName
      },

      theme: {
        color: '#0284c7'
      },

      handler: function (response) {

        const updatedBooking = {
          ...booking,
          paymentMethod: paymentMethod,
          paymentStatus: 'Paid',
          razorpayPaymentId:
            response.razorpay_payment_id
        }

        navigate('/payment-success', {
          state: {
            booking: updatedBooking,
            paymentMethod: paymentMethod,
            paymentId:
              response.razorpay_payment_id
          }
        })

      },

      modal: {
        ondismiss: function () {
          console.log(
            'Razorpay payment window closed'
          )
        }
      }

    }

    const razorpay =
      new window.Razorpay(options)

    razorpay.open()
  }

  return (
    <div className="payment-page">

      <main className="payment-content">

        <div className="container">

          {/* ================================
              HEADER
          ================================= */}

          <div className="payment-header">

            <p className="payment-label">
              PAYMENT
            </p>

            <h1>
              Choose Payment Method
            </h1>

            <span>
              Select your preferred payment option to confirm
              your AC service booking.
            </span>

          </div>


          <div className="payment-layout">

            {/* ================================
                PAYMENT METHODS
            ================================= */}

            <div className="payment-methods-card">

              <h2>
                Payment Methods
              </h2>


              {/* UPI */}

              <button
                className={`payment-method ${
                  paymentMethod === 'upi'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  handlePaymentMethod('upi')
                }
              >

                <div className="payment-method-icon">
                  📱
                </div>

                <div className="payment-method-info">

                  <strong>
                    UPI
                  </strong>

                  <span>
                    Pay using Google Pay, PhonePe,
                    Paytm or other UPI apps.
                  </span>

                </div>

                <div className="payment-radio">
                  {paymentMethod === 'upi'
                    ? '●'
                    : '○'}
                </div>

              </button>


              {/* Card */}

              <button
                className={`payment-method ${
                  paymentMethod === 'card'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  handlePaymentMethod('card')
                }
              >

                <div className="payment-method-icon">
                  💳
                </div>

                <div className="payment-method-info">

                  <strong>
                    Credit / Debit Card
                  </strong>

                  <span>
                    Pay securely using your card.
                  </span>

                </div>

                <div className="payment-radio">
                  {paymentMethod === 'card'
                    ? '●'
                    : '○'}
                </div>

              </button>


              {/* Bank */}

              <button
                className={`payment-method ${
                  paymentMethod === 'bank'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  handlePaymentMethod('bank')
                }
              >

                <div className="payment-method-icon">
                  🏦
                </div>

                <div className="payment-method-info">

                  <strong>
                    Bank Transfer
                  </strong>

                  <span>
                    Pay directly through your bank account.
                  </span>

                </div>

                <div className="payment-radio">
                  {paymentMethod === 'bank'
                    ? '●'
                    : '○'}
                </div>

              </button>


              {/* Pay After Service */}

              <button
                className={`payment-method ${
                  paymentMethod === 'pay-after-service'
                    ? 'selected'
                    : ''
                }`}
                onClick={() =>
                  handlePaymentMethod(
                    'pay-after-service'
                  )
                }
              >

                <div className="payment-method-icon">
                  💵
                </div>

                <div className="payment-method-info">

                  <strong>
                    Pay After Service
                  </strong>

                  <span>
                    Pay the service provider after
                    the AC service is completed.
                  </span>

                </div>

                <div className="payment-radio">
                  {
                    paymentMethod === 'pay-after-service'
                      ? '●'
                      : '○'
                  }
                </div>

              </button>


              {/* ================================
                  PAY AFTER SERVICE MESSAGE
              ================================= */}

              {paymentMethod === 'pay-after-service' && (

                <div className="pay-after-message">

                  <span>
                    ✓
                  </span>

                  <div>

                    <strong>
                      Pay After Service Selected
                    </strong>

                    <p>
                      No online payment is required now.
                      You can pay the provider after the
                      service is completed.
                    </p>

                  </div>

                </div>

              )}


              {/* ================================
                  ONLINE PAYMENT MESSAGE
              ================================= */}

              {paymentMethod &&
                paymentMethod !== 'pay-after-service' && (

                  <div className="online-payment-message">

                    <span>
                      🔐
                    </span>

                    <div>

                      <strong>
                        Secure Razorpay Payment
                      </strong>

                      <p>
                        You will be redirected to the
                        secure Razorpay test checkout.
                      </p>

                    </div>

                  </div>

              )}


              {/* ================================
                  ACTIONS
              ================================= */}

              <div className="payment-actions">

                <button
                  className="payment-back-btn"
                  onClick={() =>
                    navigate('/my-bookings')
                  }
                >
                  ← Back
                </button>


                <button
                  className="confirm-payment-btn"
                  onClick={handleRazorpayPayment}
                >

                  {paymentMethod === 'pay-after-service'
                    ? 'Confirm Booking'
                    : 'Pay Now'}

                </button>

              </div>

            </div>


            {/* ================================
                ORDER SUMMARY
            ================================= */}

            <div className="payment-order-card">

              <h2>
                Order Summary
              </h2>


              <div className="order-service">

                <div className="order-service-icon">
                  ❄️
                </div>

                <div>

                  <strong>
                    {booking.serviceName}
                  </strong>

                  <span>
                    AC Service
                  </span>

                </div>

              </div>


              <div className="order-details">

                <div>

                  <span>
                    Customer
                  </span>

                  <strong>
                    {booking.customerName}
                  </strong>

                </div>


                <div>

                  <span>
                    Date
                  </span>

                  <strong>
                    {booking.date}
                  </strong>

                </div>


                <div>

                  <span>
                    Time
                  </span>

                  <strong>
                    {booking.time}
                  </strong>

                </div>


                <div>

                  <span>
                    City
                  </span>

                  <strong>
                    {booking.city}
                  </strong>

                </div>

              </div>


              <div className="order-price">

                <div>

                  <span>
                    Service Price
                  </span>

                  <strong>
                    ₹{booking.price}
                  </strong>

                </div>


                <div>

                  <span>
                    Service Charge
                  </span>

                  <strong>
                    ₹0
                  </strong>

                </div>

              </div>


              <div className="order-total">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{booking.price}
                </strong>

              </div>


              <div className="secure-payment">

                🔒

                <span>
                  Your payment information is secure.
                </span>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Payment