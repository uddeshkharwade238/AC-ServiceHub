import './About.css'

function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="container">

          <p className="about-label">
            ABOUT US
          </p>

          <h1>
            Reliable AC Service at Your Doorstep
          </h1>

          <p className="about-intro">
            AC ServiceHub makes it easy to book professional
            AC services from the comfort of your home.
          </p>

        </div>
      </section>

      {/* About Content */}
      <section className="about-section">
        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <p className="about-small-title">
                WHO WE ARE
              </p>

              <h2>
                Professional AC Care Made Simple
              </h2>

              <p>
                AC ServiceHub is a home AC service platform
                designed to make AC maintenance and repair
                simple, convenient and reliable.
              </p>

              <p>
                Customers can explore available services,
                check service details, choose a suitable
                service and book professional assistance
                at their doorstep.
              </p>

            </div>

            <div className="col-lg-6">

              <div className="about-feature-card">

                <div className="about-feature-icon">
                  ❄️
                </div>

                <h3>
                  Quality AC Service
                </h3>

                <p>
                  Professional service designed to keep your
                  AC running smoothly and efficiently.
                </p>

              </div>

              <div className="about-feature-card">

                <div className="about-feature-icon">
                  🏠
                </div>

                <h3>
                  Doorstep Convenience
                </h3>

                <p>
                  Book your required AC service from home
                  without unnecessary hassle.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-why-section">

        <div className="container">

          <div className="text-center about-why-header">

            <p className="about-small-title">
              WHY AC SERVICEHUB
            </p>

            <h2>
              Service You Can Rely On
            </h2>

          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="about-info-card">
                <span>⚡</span>
                <h3>Quick Booking</h3>
                <p>
                  Easily select and book the AC service
                  you need.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-info-card">
                <span>🛠️</span>
                <h3>Professional Service</h3>
                <p>
                  Get dependable AC maintenance and
                  repair services.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-info-card">
                <span>📍</span>
                <h3>At Your Doorstep</h3>
                <p>
                  Convenient home service for your
                  AC requirements.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default About