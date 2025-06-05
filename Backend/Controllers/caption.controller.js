const captainModel = require('../models/captain.model');
const captainService = require('../Services/caption.service'); // Double check spelling of 'caption'
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    try {
        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ error: 'Captain with this email already exists' });
        }

        const hashedPassword = await captainModel.hashPassword(password); // ✅ Renamed variable

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            capacity: vehicle.capacity,
            plate: vehicle.plate,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken(); // Make sure this method exists in your model
        return res.status(201).json({ message: 'Captain registered successfully', captain });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
