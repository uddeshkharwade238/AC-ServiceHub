import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ServiceDetails.css'

function ServiceDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [service, setService] = useState(null)

  useEffect(() => {

    axios
      .get(`http://localhost:8080/api/services/${id}`)
      .then((response) => {

        const backendService = response.data

        const serviceData = {
          id: backendService.id,
          name: backendService.serviceName,
          price: backendService.price,
          rating: backendService.rating,
          ratingCount: backendService.ratingCount,
          description: backendService.description,
          image: backendService.imageUrl,
          status: backendService.status
        }

        setService(serviceData)
      })
      .catch((error) => {
        console.error('Error loading service details:', error)
        setService(null)
      })

  }, [id])

  if (!service) {

    return (
      <div className="service-not-found">

        <h2>
          Service Not Found
        </h2>

        <button
          onClick={() => navigate('/customer-services')}
        >
          Back to Services
        </button>

      </div>
    )
  }

  return (
    <div className="service-details-page">

      <section className="details-section">

        <div className="container">

          <div className="row align-items-center g-5">

            {/* Service Image */}

            <div className="col-lg-6">

              {service.image ? (

                <img
                  src={service.image}
                  alt={service.name}
                  className="details-image"
                />

              ) : (

                <div className="details-no-image">
                  ❄️
                </div>

              )}

            </div>

            {/* Service Information */}

            <div className="col-lg-6">

              <p className="details-small">
                AC SERVICE
              </p>

              <h1>
                {service.name}
              </h1>

              <div className="details-rating">
                ⭐ {Number(service.rating || 0).toFixed(1)} / 5
                <span>
                  {' '}
                  ({service.ratingCount || 0} reviews)
                </span>
              </div>

              <p className="details-description">
                {service.description}
              </p>

              <div className="details-price">
                ₹{service.price}
              </div>

              <h3>
                Service Benefits
              </h3>

              <div className="benefits-list">

                <div className="benefit-item">
                  <span>✓</span>
                  Professional AC technician
                </div>

                <div className="benefit-item">
                  <span>✓</span>
                  Quality service
                </div>

                <div className="benefit-item">
                  <span>✓</span>
                  Complete service inspection
                </div>

                <div className="benefit-item">
                  <span>✓</span>
                  Better AC performance
                </div>

              </div>

              <div className="details-buttons">

                <button
                  className="book-details-btn"
                  onClick={() =>
                    navigate('/booking', {
                      state: {
                        service: service
                      }
                    })
                  }
                >
                  Book Service
                </button>

                <button
                  className="back-details-btn"
                  onClick={() =>
                    navigate('/customer-services')
                  }
                >
                  Back to Services
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default ServiceDetails