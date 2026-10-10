# ❄️ AC ServiceHub

AC ServiceHub is a full-stack web application for booking and managing air conditioner services online.

The system provides separate interfaces for **Customers** and **Administrators**. Customers can browse AC services, book services, track bookings, make payments and submit reviews. Administrators can manage services, customers, providers, bookings and customer reviews.

---

## 🚀 Features

### 👤 Customer Features

- Customer Registration
- Customer Login
- Customer Dashboard
- Browse AC Services
- View Service Details
- Book AC Services
- View My Bookings
- Track Booking Status
- Cancel Pending Booking
- Online Payment using Razorpay
- Payment Status Tracking
- Customer Profile Management
- Submit Service Reviews
- Dark / Light Mode
- Responsive Design

### 👨‍💼 Admin Features

- Admin Login
- Admin Dashboard
- Service Management
- Add AC Service
- Edit AC Service
- Delete AC Service
- Active / Inactive Services
- Customer Management
- Provider Management
- Booking Management
- Confirm / Reject Bookings
- Complete Bookings
- Review Management
- Delete Customer Reviews
- Payment Status Management

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- Bootstrap
- JavaScript
- React.js
- React Router
- Axios
- Vite

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST API

### Database

- MySQL 8

### Payment

- Razorpay Test Mode

---

## 🏗️ Project Architecture

```text
Customer / Admin
       ↓
React Frontend
       ↓
Axios
       ↓
Spring Boot REST API
       ↓
JPA / Hibernate
       ↓
MySQL Database