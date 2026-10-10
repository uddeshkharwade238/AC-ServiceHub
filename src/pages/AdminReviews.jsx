import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminReviews.css'

function AdminReviews() {

  const [reviews, setReviews] = useState([])

  const loadReviews = async () => {
    try {

      const response = await axios.get(
        'http://localhost:8080/api/reviews'
      )

      setReviews(response.data)

    } catch (error) {

      console.error('Error loading reviews:', error)

      alert('Unable to load reviews from server.')

    }
  }

  useEffect(() => {

    loadReviews()

    const handleReviewsUpdated = () => {
      loadReviews()
    }

    window.addEventListener(
      'reviewsUpdated',
      handleReviewsUpdated
    )

    return () => {
      window.removeEventListener(
        'reviewsUpdated',
        handleReviewsUpdated
      )
    }

  }, [])


  const handleDeleteReview = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this review?'
    )

    if (!confirmDelete) {
      return
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/reviews/${id}`
      )

      setReviews(
        reviews.filter(
          (review) => review.id !== id
        )
      )

      window.dispatchEvent(
        new Event('reviewsUpdated')
      )

      alert('Review deleted successfully!')

    } catch (error) {

      console.error('Error deleting review:', error)

      alert('Unable to delete review.')

    }
  }


  return (
    <div className="admin-reviews-page">

      <main className="admin-reviews-content">

        <div className="container">

          {/* Header */}

          <div className="admin-reviews-header">

            <div>
              <p className="admin-reviews-small">
                CUSTOMER FEEDBACK
              </p>

              <h1>
                Customer Reviews
              </h1>

              <p>
                View and manage reviews submitted by customers.
              </p>
            </div>

            <div className="reviews-count-box">
              <span>
                Total Reviews
              </span>

              <strong>
                {reviews.length}
              </strong>
            </div>

          </div>


          {/* Reviews */}

          {reviews.length === 0 ? (

            <div className="no-admin-reviews">

              <div className="no-reviews-icon">
                ⭐
              </div>

              <h3>
                No Reviews Yet
              </h3>

              <p>
                Customer reviews will appear here after
                customers submit their reviews.
              </p>

            </div>

          ) : (

            <div className="admin-reviews-list">

              {reviews
                .slice()
                .reverse()
                .map((review) => (

                  <div
                    className="admin-review-card"
                    key={review.id}
                  >

                    {/* Top */}

                    <div className="admin-review-top">

                      <div className="admin-review-customer">

                        <div className="admin-review-avatar">
                          {review.customerName
                            ?.charAt(0)
                            ?.toUpperCase() || 'C'}
                        </div>

                        <div>

                          <h3>
                            {review.customerName ||
                              'Customer'}
                          </h3>

                          <p>
                            {review.customerEmail || ''}
                          </p>

                        </div>

                      </div>


                      <div className="admin-review-date">

                        {review.createdAt
                          ? new Date(
                              review.createdAt
                            ).toLocaleDateString()
                          : ''}

                      </div>

                    </div>


                    {/* Service */}

                    <div className="admin-review-service">

                      <span>
                        Service
                      </span>

                      <strong>
                        {review.serviceName}
                      </strong>

                    </div>


                    {/* Rating */}

                    <div className="admin-review-rating">

                      <span className="admin-stars">

                        {'★'.repeat(
                          Number(review.rating)
                        )}

                        {'☆'.repeat(
                          5 - Number(review.rating)
                        )}

                      </span>

                      <span className="admin-rating-number">
                        {Number(review.rating).toFixed(1)} / 5
                      </span>

                    </div>


                    {/* Comment */}

                    <div className="admin-review-comment">

                      <p>
                        "{review.comment}"
                      </p>

                    </div>


                    {/* Action */}

                    <div className="admin-review-actions">

                      <button
                        className="admin-delete-review-btn"
                        onClick={() =>
                          handleDeleteReview(review.id)
                        }
                      >
                        🗑️ Delete Review
                      </button>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default AdminReviews