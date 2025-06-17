const rideModel = require('../models/ride.model');
const mapService = require('../Services/maps.service');
const crypto = require('crypto');

// Fare calculation based on distance and duration
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  console.log(distanceTime);

  const distance = distanceTime.distance.value; // in meters
  const duration = distanceTime.duration.value; // in seconds

  // Base rates for different vehicle types
  const rates = {
    auto: {
      baseRate: 25,
      perKm: 12,
      perMinute: 1
    },
    car: {
      baseRate: 40,
      perKm: 15,
      perMinute: 2
    },
    moto: {
      baseRate: 20,
      perKm: 10,
      perMinute: 0.5
    }
  };

  // Calculate fare for each vehicle type
  const fare = {};

  for (const [vehicle, rate] of Object.entries(rates)) {
    const fareAmount = rate.baseRate +
      ((distance / 1000) * rate.perKm) +
      ((duration / 60) * rate.perMinute);

    fare[vehicle] = Math.round(fareAmount);
  }

  return fare;
}

module.exports.getFare = getFare


// your otp 
function getOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp
}

// Create Ride
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fareObj = await getFare(pickup, destination);
  console.log(fareObj);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fareObj[vehicleType]
  });

  return ride;
};


