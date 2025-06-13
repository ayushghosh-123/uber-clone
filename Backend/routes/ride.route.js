const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const rideController = require('../Controllers/ride.controller')
const AuthMiddleware = require('../middleware/auth.middleware')

router.post('/create', 
    AuthMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto']).withMessage('Invalid vehicle name'),
    rideController.createRide 
    )

module.exports = router 