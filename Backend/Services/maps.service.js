const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: process.env.GOOGLE_MAPS_API,
        },
      }
    );

    if (response.data.status === "OK") {
      return response.data.results[0].geometry.location;
    } else {
      throw new Error("Geocoding failed: " + response.data.status);
    }
  } catch (error) {
    console.error("Geocode error:", error.message);
    throw new Error("Unable to fetch coordinates");
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`,
      {
        params: {
          origins: origin,
          destinations: destination,
          key: process.env.GOOGLE_MAPS_API,
        },
      }
    );

    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];

      if (element.status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      return element; // contains distance and duration
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error("Distance Matrix error:", error.response?.data || error.message);
    throw new Error("Unable to fetch coordinates");
  }
};


module.exports.getAutoSuggestion = async (input) => {
  if (!input) {
    throw new Error("Address input is required");
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input: input,
          key: process.env.GOOGLE_MAPS_API,
        },
      }
    );

    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error("Autocomplete error:", err.response?.data || err.message);
    throw new Error("Failed to fetch autocomplete suggestions");
  }
};
