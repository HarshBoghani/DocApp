# Doctor Appointment Booking 
 
# DocApp  

DocApp is a simple and intuitive doctor appointment booking platform designed to connect patients with trusted healthcare providers effortlessly.

## 🌟 Features

### 👤 Role-Based Authentication
- 🧑‍⚕️ **Patients**
  - Register and log in securely.
  - Search doctors by specialization.
  - Book appointments with selected doctors.
  - Manage and view appointment history.

- 🩺 **Doctors**
  - Secure login and dashboard access.
  - View booked appointments.
  - Track earnings and manage profile details.
  - Accept or reject appointment requests.

- 🛠️ **Admins**
  - Access to admin dashboard.
  - Manage doctor approvals and user accounts.
  - View and control all appointments in the system.

---

### 📅 Appointment Booking System
- Fully functional scheduling system.
- Patients choose time slots based on doctor availability.
- Doctors receive real-time booking updates.
- Appointment status tracking: pending, confirmed, completed.

---

### 📊 Dashboard & Analytics
- 📍 Role-specific dashboards:
  - Patients: Upcoming and past appointments.
  - Doctors: Booking stats and earnings.
  - Admin: System-wide stats and control panels.
- Responsive design works across all devices.

---

### 🛡️ Additional Features
- 🔐 JWT-based Authentication & Authorization.
- 📁 MongoDB for persistent and scalable data storage.
- 🌐 RESTful APIs built with Node.js & Express.js.



## How to Run  

```bash
# Clone the repository

# Navigate to the project directory
cd DocApp

# Backend setup
cd backend
npm install
node server.js

# Frontend setup
cd frontend
npm install
npm run dev
