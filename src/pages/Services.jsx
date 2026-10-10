
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Services.css'

function Services() {

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

      const activeServices = response.data.filter(
        (service) => service.status === 'Active'
      )

      setServices(activeServices)

    } catch (error) {

      console.error(
        'Error loading services:',
        error
      )

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
    <div className="services-page">


      {/* ================= HEADER ================= */}

      <section className="services-header">

        <div className="container text-center">

          <p className="section-small">
            OUR SERVICES
          </p>

          <h1>
            Professional AC Services
          </h1>

          <p>
            Choose the AC service you need and get professional
            service at your doorstep.
          </p>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section className="services-section">

        <div className="container">


          {/* ================= LOADING ================= */}

          {loading && (

            <div className="no-services">

              <div className="empty-icon">
                ⏳
              </div>

              <h3>
                Loading Services...
              </h3>

              <p>
                Please wait while we load our available
                AC services.
              </p>

            </div>

          )}


          {/* ================= ERROR ================= */}

          {!loading && error && (

            <div className="no-services">

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
                className="book-btn"
                onClick={loadServices}
              >
                Retry
              </button>

            </div>

          )}


          {/* ================= NO SERVICES ================= */}

          {!loading &&
            !error &&
            services.length === 0 && (

              <div className="no-services">

                <div className="empty-icon">
                  ❄️
                </div>

                <h3>
                  No Services Available
                </h3>

                <p>
                  Our services will appear here once they
                  are added by the administrator.
                </p>

              </div>

            )}


          {/* ================= SERVICE CARDS ================= */}

          {!loading &&
            !error &&
            services.length > 0 && (

              <div className="row g-4">

                {services.map((service) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={service.id}
                  >

                    <div className="service-card">


                      {/* Service Image */}

                      <img
                        src={service.imageUrl}
                        alt={service.serviceName}
                        className="service-image"
                      />


                      {/* Service Name */}

                      <h3>
                        {service.serviceName}
                      </h3>


                      {/* Rating */}

                      <div className="service-rating">

                        ⭐ {Number(
                          service.rating || 0
                        ).toFixed(1)}

                        <span className="rating-count">
                          {' '}
                          ({service.ratingCount || 0} reviews)
                        </span>

                      </div>


                      {/* Description */}

                      <p>
                        {service.description}
                      </p>


                      {/* Bottom */}

                      <div className="service-bottom">

                        <span className="service-price">
                          ₹{service.price}
                        </span>


                        <div className="service-buttons">

                          <Link
                            to={`/service/${service.id}`}
                            className="details-btn"
                          >
                            View Details
                          </Link>


                          <Link
                            to="/login"
                            className="book-btn"
                          >
                            Book Service
                          </Link>

                        </div>

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

export default Services
