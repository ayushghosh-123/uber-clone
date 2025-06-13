// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Core modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const connectDB = require('./db/db');
connectDB();

// Routes
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.route')

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/ride', rideRoutes)

// Export the app
module.exports = app;
