
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './CustomerServices.css'

function CustomerServices() {
  const navigate = useNavigate()

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadServices = async () => {

    setLoading(true)
    setError(false)

    try {

      const response = await axios.get(
        'http://localhost:8080/api/services'
      )

      const backendServices = response.data.map((service) => ({
        id: service.id,
        name: service.serviceName,
        price: service.price,
        rating: service.rating,
        ratingCount: service.ratingCount,
        description: service.description,
        image: service.imageUrl,
        status: service.status
      }))

      const activeServices = backendServices.filter(
        (service) => service.status === 'Active'
      )

      setServices(activeServices)

    } catch (error) {

      console.error('Error loading services:', error)

      setServices([])
      setError(true)

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    loadServices()

    const handleServicesUpdated = () => {
      loadServices()
    }

    window.addEventListener(
      'servicesUpdated',
      handleServicesUpdated
    )

    return () => {

      window.removeEventListener(
        'servicesUpdated',
        handleServicesUpdated
      )

    }

  }, [])


  return (
    <div className="customer-services-page">

      {/* Header */}

      <section className="customer-services-header">

        <div className="container text-center">

          <p className="section-small">
            AC SERVICE
          </p>

          <h1>
            Choose Your AC Service
          </h1>

          <p>
            Select the service you need and book a
            professional AC service at your doorstep.
          </p>

        </div>

      </section>


      {/* Services */}

      <section className="customer-services-section">

        <div className="container">


          {/* Loading */}

          {loading && (

            <div className="no-customer-services">

              <div className="empty-icon">
                ⏳
              </div>

              <h3>
                Loading Services...
              </h3>

              <p>
                Please wait while we load the available
                AC services.
              </p>

            </div>

          )}


          {/* Error */}

          {!loading && error && (

            <div className="no-customer-services">

              <div className="empty-icon">
                ⚠️
              </div>

              <h3>
                Unable to Load Services
              </h3>

              <p>
                Something went wrong while loading
                services. Please try again.
              </p>

              <button
                className="customer-book-btn"
                onClick={loadServices}
              >
                Retry
              </button>

            </div>

          )}


          {/* No Services */}

          {!loading &&
            !error &&
            services.length === 0 && (

              <div className="no-customer-services">

                <div className="empty-icon">
                  ❄️
                </div>

                <h3>
                  No Services Available
                </h3>

                <p>
                  Currently there are no active AC services
                  available for booking.
                </p>

              </div>

            )}


          {/* Services List */}

          {!loading &&
            !error &&
            services.length > 0 && (

              <div className="row g-4">

                {services.map((service) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={service.id}
                  >

                    <div className="customer-service-card">


                      {/* Image */}

                      <div className="customer-service-image-wrapper">

                        {service.image ? (

                          <img
                            src={service.image}
                            alt={service.name}
                            className="customer-service-image"
                          />

                        ) : (

                          <div className="customer-service-no-image">
                            ❄️
                          </div>

                        )}

                      </div>


                      {/* Content */}

                      <div className="customer-service-content">

                        <h3>
                          {service.name}
                        </h3>


                        {/* Rating */}

                        <div className="customer-service-rating">

                          ⭐ {Number(
                            service.rating || 0
                          ).toFixed(1)}

                          <span className="rating-count">
                            {' '}
                            ({service.ratingCount || 0} reviews)
                          </span>

                        </div>


                        {/* Description */}

                        <p className="customer-service-description">
                          {service.description}
                        </p>


                        {/* Bottom */}

                        <div className="customer-service-bottom">

                          <span className="customer-service-price">
                            ₹{service.price}
                          </span>

                          <button
                            className="customer-view-btn"
                            onClick={() =>
                              navigate(
                                `/service/${service.id}`
                              )
                            }
                          >
                            View Details
                          </button>

                        </div>


                        {/* Book Button */}

                        <button
                          className="customer-book-btn"
                          onClick={() =>
                            navigate(
                              `/service/${service.id}`
                            )
                          }
                        >
                          Book Service
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

        </div>

      </section>

    </div>
  )
}

export default CustomerServices
