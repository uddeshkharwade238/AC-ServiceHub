import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert('Please fill all fields')
      return
    }

    alert('Thank you! Your message has been submitted.')

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="container text-center">

          <p className="contact-label">
            CONTACT US
          </p>

          <h1>
            We’re Here to Help
          </h1>

          <p>
            Have a question about our AC services?
            Get in touch with our team.
          </p>

        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">

        <div className="container">

          <div className="row g-5">

            {/* Contact Information */}
            <div className="col-lg-5">

              <p className="contact-small-title">
                GET IN TOUCH
              </p>

              <h2>
                Contact AC ServiceHub
              </h2>

              <p className="contact-description">
                Whether you need help with a booking,
                service information or any other query,
                feel free to contact us.
              </p>

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  📞
                </div>

                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>

              </div>

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  ✉️
                </div>

                <div>
                  <h3>Email</h3>
                  <p>support@acservicehub.com</p>
                </div>

              </div>

              <div className="contact-info-card">

                <div className="contact-info-icon">
                  📍
                </div>

                <div>
                  <h3>Location</h3>
                  <p>India</p>
                </div>

              </div>

            </div>

            {/* Contact Form */}
            <div className="col-lg-7">

              <div className="contact-form-card">

                <h2>
                  Send Us a Message
                </h2>

                <p>
                  Fill out the form and our team will get
                  back to you.
                </p>

                <form onSubmit={handleSubmit}>

                  <div className="row g-3">

                    <div className="col-md-6">

                      <label>
                        Your Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6">

                      <label>
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-12">

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-12">

                      <label>
                        Message
                      </label>

                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Write your message..."
                        value={formData.message}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-12">

                      <button
                        type="submit"
                        className="contact-submit-btn"
                      >
                        Send Message
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Contact