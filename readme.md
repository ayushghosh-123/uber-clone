# 🚗 Uber Clone (MERN Stack)

An end-to-end ride-hailing application that mirrors core Uber features, built using the MERN stack (MongoDB, Express.js, React, Node.js) with real-time tracking and payment processing ([github.com][1]).

---

## 🔍 Overview

The Uber Clone app demonstrates full-stack development with real-time capabilities:

* User & driver authentication
* Ride booking with live tracking
* OTP-secured ride validation
* Fare estimation and payment
* Ride history and admin oversight 

---

## ✅ Features

* **Authentication**: JWT-based user and driver login
* **Booking & Tracking**: Request and accept rides, track via Google Maps + Socket.IO
* **OTP Verification**: Secure ride initiation
* **Fare Calculation**: Dynamic pricing based on distance & vehicle type
* **Payments**: Support for online and cash (Stripe/Razorpay integration optional)
* **Ride History**: Display past trips for both roles

---

## 🛠️ Tech Stack

### Frontend

* React.js (+ Redux for state management)
* Tailwind CSS
* Google Maps API
* Socket.IO client

### Backend

* Node.js + Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT)
* Socket.IO server
* Bcrypt.js for password hashing

---

## 🧩 Installation

1. Clone repository:

   ```bash
   git clone https://github.com/ayushghosh-123/uber-clone.git
   cd uber-clone
   ```

2. Install backend:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend:

   ```bash
   cd ../frontend
   npm install
   ```

---

## 🔧 Environment Variables

Create `.env` in both folders:

**Backend (`backend/.env`):**

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_api_key
```

**Frontend (`frontend/.env`):**

```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

---

## ▶️ Running the App

### 🧪 Development mode

Start backend:

```bash
cd backend
npx nodemon server.js
```

Start frontend:

```bash
cd frontend
npm run dev
```

Visit: **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
uber-clone/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
└─ frontend/
   ├─ src/
   │  ├─ components/
   │  ├─ pages/
   │  └─ App.jsx
   └─ public/
```

---

## 🔗 API Endpoints

### Auth

* `POST /auth/register` – Register user/driver
* `POST /auth/login` – Login

### Rides

* `POST /rides` – Request ride
* `GET /rides/:id/track` – Socket endpoint for live tracking
* `POST /rides/:id/otp` – Validate ride start

---

## 📊 Workflow & Architecture

* **Workflow overview**: user → backend → driver via Socket.IO
* **Architecture diagram**: MERN flow + Maps & WebSocket
* **DB schema**: Users, Drivers, Rides, Payments

Visuals improve clarity and presentation.

---

## 🤝 Contributing

Contributions welcome!

1. Fork this repo
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

### ⚙️ Customize as Needed

Feel free to tailor:

* Docker support (`Dockerfile` + `docker-compose.yml`)
* Admin dashboard
* Payment gateway integration
* Push notifications & rating system

---


