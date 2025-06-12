const express = require('express')
const router = express.Router()
const mapController = require('../Controllers/map.controller')
const authMiddleware = require('../middleware/auth.middleware');
const { query } = require('express-validator')

router.get('/get-coordinate', query('address').isString().isLength({ min:3}), authMiddleware.authUser, mapController.getCoordinates)
router.get('/get-distance-time', query('origin').isString().isLength({ min:3}), query('destination').isString().isLength({ min:3}), authMiddleware.authUser, mapController.getDistanceTime)
router.get('/get-suggestion', query('input').isString().isLength({ min:3}), authMiddleware.authUser, mapController.getAutoSuggestion)


module.exports = router;