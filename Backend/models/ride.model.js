const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captain',
  },
  pickup: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'pending'
  },
  duration: {
    type: Number
  }, // in seconds
  distance: {
    type: Number
  }, // in meters
  paymentID: {
    type: String,
  },
  orderId: {
    type: String
  },
  signature: {
    type: String
  },
  otp :{
    type: String,
    select: false,
    require: true
  }
});

module.exports = mongoose.model('Ride', RideSchema);
