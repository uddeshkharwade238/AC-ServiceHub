import { useState } from 'react'
import axios from 'axios'
import './ReviewModal.css'

function ReviewModal({ booking, onClose, onReviewSubmitted }) {

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (rating === 0) {
      alert('Please select a rating')
      return
    }

    if (!comment.trim()) {
      alert('Please write a review')
      return
    }

    const customer = JSON.parse(
      localStorage.getItem('customer') || 'null'
    )

    const newReview = {

      bookingId: booking.id,

      serviceId: booking.serviceId,

      serviceName: booking.serviceName,

      customerId: customer?.id || booking.customerId,

      customerName:
        customer?.name || booking.customerName,

      customerEmail:
        customer?.email || booking.customerEmail,

      rating: rating,

      comment: comment.trim()
    }

    try {

      setLoading(true)

      const response = await axios.post(
        'http://localhost:8080/api/reviews',
        newReview
      )

      console.log(
        'Review saved:',
        response.data
      )

      window.dispatchEvent(
        new Event('reviewsUpdated')
      )

      alert('Review submitted successfully!')

      if (onReviewSubmitted) {
        onReviewSubmitted(response.data)
      }

      onClose()

    } catch (error) {

      console.error(
        'Review submission error:',
        error
      )

      alert(
        'Failed to submit review. Please try again.'
      )

    } finally {

      setLoading(false)

    }
  }


  return (
    <div className="review-modal-overlay">

      <div className="review-modal">

        <div className="review-modal-header">

          <div>

            <p className="review-small-title">
              SHARE YOUR EXPERIENCE
            </p>

            <h2>
              Rate Your Service
            </h2>

          </div>

          <button
            className="review-close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>


        <div className="review-service-info">

          <h3>
            {booking?.serviceName}
          </h3>

          <p>
            How was your experience with this service?
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="rating-section">

            <label>
              Your Rating
            </label>


            <div className="stars">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  type="button"
                  key={star}
                  className={
                    star <= (hoverRating || rating)
                      ? 'star active'
                      : 'star'
                  }
                  onClick={() =>
                    setRating(star)
                  }
                  onMouseEnter={() =>
                    setHoverRating(star)
                  }
                  onMouseLeave={() =>
                    setHoverRating(0)
                  }
                >
                  ★
                </button>

              ))}

            </div>


            <span className="rating-text">

              {rating === 0
                ? 'Select your rating'
                : `${rating} out of 5`}

            </span>

          </div>


          <div className="comment-section">

            <label>
              Your Review
            </label>

            <textarea
              rows="5"
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

          </div>


          <div className="review-actions">

            <button
              type="button"
              className="review-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="review-submit-btn"
              disabled={loading}
            >
              {loading
                ? 'Submitting...'
                : 'Submit Review'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default ReviewModal