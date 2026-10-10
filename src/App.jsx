
import {BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar'
import CustomerNavbar from './components/CustomerNavbar'
import AdminNavbar from './components/AdminNavbar'

import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin'

import CustomerDashboard from './pages/CustomerDashboard'
import CustomerServices from './pages/CustomerServices'
import AdminDashboard from './pages/AdminDashboard'

import AdminServices from './pages/AdminServices'
import AdminCustomers from './pages/AdminCustomers'
import AdminProviders from './pages/AdminProviders'
import AdminBookings from './pages/AdminBookings'
import Booking from './pages/Booking'
import BookingSummary from './pages/BookingSummary'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminReviews from './pages/AdminReviews'


/* ================= CUSTOMER PROTECTION ================= */

function CustomerProtectedRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true'

  const userRole =
    localStorage.getItem('userRole')

  if (!isLoggedIn || userRole !== 'customer') {
    window.location.href = '/login'
    return null
  }

  return children
}


/* ================= ADMIN PROTECTION ================= */

function AdminProtectedRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true'

  const userRole =
    localStorage.getItem('userRole')

  if (!isLoggedIn || userRole !== 'admin') {
    window.location.href = '/admin-login'
    return null
  }

  return children
}


function AppContent() {

  const location = useLocation()

  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true'

  const userRole =
    localStorage.getItem('userRole')


  /* ================= CUSTOMER ================= */

  const customerRoutes = [
    '/customer-dashboard',
    '/customer-services',
    '/my-bookings',
    '/profile',
    '/booking',
    '/booking-summary',
    '/payment',
    '/payment-success'
  ]

  const isCustomerRoute =
    customerRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/service/')

  const isCustomer =
    isLoggedIn &&
    userRole === 'customer' &&
    isCustomerRoute


  /* ================= ADMIN ================= */

  const adminRoutes = [
    '/admin-dashboard',
    '/admin-services',
    '/admin-customers',
    '/admin-providers',
    '/admin-bookings',
    '/admin-reviews'
  ]

  const isAdminRoute =
    adminRoutes.includes(location.pathname)

  const isAdmin =
    isLoggedIn &&
    userRole === 'admin' &&
    isAdminRoute


  return (
    <>

      {/* ================= PUBLIC NAVBAR ================= */}

      {!isCustomer && !isAdmin && (
        <Navbar />
      )}


      {/* ================= CUSTOMER NAVBAR ================= */}

      {isCustomer && (
        <CustomerNavbar />
      )}


      {/* ================= ADMIN NAVBAR ================= */}

      {isAdmin && (
        <AdminNavbar />
      )}


      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Public Service Details */}

        <Route
          path="/service/:id"
          element={<ServiceDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* ================= CUSTOMER ================= */}

        <Route
          path="/customer-dashboard"
          element={
            <CustomerProtectedRoute>
              <CustomerDashboard />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/customer-services"
          element={
            <CustomerProtectedRoute>
              <CustomerServices />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <CustomerProtectedRoute>
              <Booking />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/booking-summary"
          element={
            <CustomerProtectedRoute>
              <BookingSummary />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <CustomerProtectedRoute>
              <Payment />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/payment-success"
          element={
            <CustomerProtectedRoute>
              <PaymentSuccess />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <CustomerProtectedRoute>
              <MyBookings />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <CustomerProtectedRoute>
              <Profile />
            </CustomerProtectedRoute>
          }
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-services"
          element={
            <AdminProtectedRoute>
              <AdminServices />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-customers"
          element={
            <AdminProtectedRoute>
              <AdminCustomers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-providers"
          element={
            <AdminProtectedRoute>
              <AdminProviders />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-bookings"
          element={
            <AdminProtectedRoute>
              <AdminBookings />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin-reviews"
          element={
            <AdminProtectedRoute>
              <AdminReviews />
            </AdminProtectedRoute>
          }
        />

      </Routes>

    </>
  )
}


function App() {

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
