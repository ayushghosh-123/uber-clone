const rideService = require('../Services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../Services/maps.service');
const { sendMessageToSocket } = require('../socket');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  // Check if user is authenticated
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType
    });

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log("Pickup Coordinates:", pickupCoordinates);

    const captainInRadious = await mapService.getCaptainInTheRadious(pickupCoordinates.lat, pickupCoordinates.lng, 2);
    console.log("Captains in Radius:", captainInRadious);

    // Clear OTP before sending back to user
    ride.otp = "";

    // Notify captains (if needed)
    // await Promise.all(
    //   captainInRadious.map(async captain => {
    //     // You can send notifications via sockets here
    //     await sendMessageToSocket(captain.socketId, {
    //       type: "NEW_RIDE",
    //       data: ride
    //     });
    //   })
    // );

    // Now send response (after all async operations)
    return res.status(201).json(ride);

  } catch (err) {
    console.error("Error in createRide:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
