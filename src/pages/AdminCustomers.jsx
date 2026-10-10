import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminCustomers.css'

function AdminCustomers() {

  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')

  const loadCustomers = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8080/api/customers'
      )

      setCustomers(response.data)

    } catch (error) {

      console.error('Error loading customers:', error)

      alert('Unable to load customers')
    }
  }


  useEffect(() => {

    loadCustomers()

    window.addEventListener(
      'customersUpdated',
      loadCustomers
    )

    return () => {
      window.removeEventListener(
        'customersUpdated',
        loadCustomers
      )
    }

  }, [])


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this customer?'
    )

    if (!confirmDelete) {
      return
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/customers/${id}`
      )

      await loadCustomers()

      window.dispatchEvent(
        new Event('customersUpdated')
      )

      alert('Customer deleted successfully!')

    } catch (error) {

      console.error('Error deleting customer:', error)

      alert('Unable to delete customer')
    }
  }


  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase())
  )


  return (
    <div className="admin-customers-page">

      <main className="admin-customers-content">

        <div className="container">

          {/* Header */}

          <div className="admin-customers-header">

            <div>

              <p className="admin-customers-label">
                CUSTOMER MANAGEMENT
              </p>

              <h1>
                Manage Customers
              </h1>

              <p>
                View and manage registered AC ServiceHub customers.
              </p>

            </div>

            <div className="customer-count-box">

              <span>👥</span>

              <div>

                <strong>
                  {customers.length}
                </strong>

                <small>
                  Total Customers
                </small>

              </div>

            </div>

          </div>


          {/* Search */}

          <div className="customer-search-box">

            <input
              type="text"
              placeholder="Search customer by name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Customer Table */}

          {filteredCustomers.length > 0 ? (

            <div className="customers-table-wrapper">

              <table className="customers-table">

                <thead>

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredCustomers.map(
                    (customer, index) => (

                      <tr key={customer.id}>

                        <td>
                          {index + 1}
                        </td>


                        <td>

                          <div className="customer-info">

                            <div className="customer-avatar">
                              {customer.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <strong>
                                {customer.name}
                              </strong>

                              <small>
                                Customer
                              </small>

                            </div>

                          </div>

                        </td>


                        <td>
                          {customer.email}
                        </td>


                        <td>

                          <span className="customer-status">
                            Active
                          </span>

                        </td>


                        <td>

                          <button
                            className="delete-customer-btn"
                            onClick={() =>
                              handleDelete(
                                customer.id
                              )
                            }
                          >
                            🗑 Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="no-customers">

              <div className="no-customers-icon">
                👥
              </div>

              <h2>
                No Customers Found
              </h2>

              <p>
                Registered customers will appear here.
              </p>

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default AdminCustomers