const userModel = require ('../models/user.model')
const { validationResult } = require('express-validator');
const userService = require ('../Services/user.service')
const blacklistTokenModel = require('../models/blaclistToken.model');

module.exports.register = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);

    const isUserAlreadyExist = await userModel.findOne({ email: req.body.email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }

    try {
        const { fullname, email, password } = req.body;
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword });
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Check if token is already blacklisted
        const exists = await blacklistTokenModel.findOne({ token });

        if (!exists) {
            await blacklistTokenModel.create({ token });
        }

        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};
