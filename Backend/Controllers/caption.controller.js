const blaclistTokenModel = require("../models/blaclistToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../Services/caption.service"); // Double check spelling of 'caption'
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt')

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  try {
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
      return res
        .status(400)
        .json({ error: "Captain with this email already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      capacity: vehicle.capacity,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken(); // Make sure this method exists in your model
    return res.status(201).json({ token, captain });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const foundCaptain = await captainModel.findOne({ email }).select("+password");

    if (!foundCaptain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await foundCaptain.comparePassword(password);
    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = foundCaptain.generateAuthToken();

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 });

    const captainWithoutPassword = foundCaptain.toObject();
    delete captainWithoutPassword.password;

    res.status(200).json({ token, captain: captainWithoutPassword });
  } catch (error) {
    console.error("Login Captain Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.getCaptainProfile = async (req, res) => {
  try {
    const captain = req.captain; // This should be set by your auth middleware
    if (!captain) {
      return res.status(404).json({ error: "Captain not found" });
    }

    return res.status(200).json({ captain: req.captain });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication token is missing" })} // Blacklist the token

    await blaclistTokenModel.create({ token });

    res.clearCookie("token"); // Clear the cookie if you're using cookies for auth

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
