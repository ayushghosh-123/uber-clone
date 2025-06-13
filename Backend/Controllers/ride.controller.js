const rideService = require('../Services/ride.service'); // Capitalized by convention
const { validationResult } = require('express-validator');

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

    return res.status(201).json(ride);
  } catch (err) {
    // Corrected to use 'err.message' as the error object is named 'err' here
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async(req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
  }

  const { pickup, destination } = req.query;
  // --- CRITICAL FIX END ---

  try {
      const fare = await rideService.getFare(pickup, destination);
      return res.status(200).json(fare);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}
