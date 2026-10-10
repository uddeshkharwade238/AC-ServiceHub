import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {

    const navigate = useNavigate()

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-6">

              <p className="hero-small">
                PROFESSIONAL AC SERVICES
              </p>

              <h1>
                Keep Your AC
                <br />
                <span>Cool & Perfect</span>
              </h1>

              <p className="hero-text">
                Reliable AC repair, cleaning, installation and maintenance
                services at your doorstep. Book a professional service
                whenever you need it.
              </p>

              <div className="mt-3">
                
                <button className="hero-outline-btn"
                onClick={() => navigate('/services')}
                >
                  Explore Services
                </button>

              </div>

            </div>

            {/* Right Card */}
            <div className="col-lg-6">

              <div className="hero-card">

                <div className="ac-icon">
                  ❄️
                </div>

                <h3>
                  AC ServiceHub
                </h3>

                <p>
                  Fast, reliable and professional AC services
                  at your doorstep.
                </p>

                <div className="service-points">
                  <span>✓ Professional Technicians</span>
                  <span>✓ Quick Service</span>
                  <span>✓ Affordable Pricing</span>
                  <span>✓ Trusted Service</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">

          <div className="text-center mb-5">

            <p className="section-small">
              WHY CHOOSE US
            </p>

            <h2>
              Reliable AC Service at Your Doorstep
            </h2>

          </div>

          <div className="row g-4">

            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="feature-card text-center">

                <div>👨‍🔧</div>

                <h4>
                  Expert Technicians
                </h4>

                <p>
                  Get your AC serviced by trained and
                  experienced professionals.
                </p>

              </div>
            </div>


            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="feature-card text-center">

                <div>⚡</div>

                <h4>
                  Quick Service
                </h4>

                <p>
                  Easy booking and fast doorstep service
                  according to your schedule.
                </p>

              </div>
            </div>


            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="feature-card text-center">

                <div>💰</div>

                <h4>
                  Affordable Price
                </h4>

                <p>
                  Transparent and affordable pricing
                  for all AC services.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Home