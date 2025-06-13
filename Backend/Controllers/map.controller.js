const mapService = require('../Services/maps.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // It's good practice to return the validation errors clearly
        return res.status(400).json({ errors: errors.array() })
    }

    const {address} = req.query;

    try{
        const coordinate = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinate)
    }catch(err){
        // Log the actual error for debugging purposes on the server side
        console.error("Error in getCoordinates:", err);
        // Provide a general message to the client, but log the specific error internally
        res.status(404).json({ message: 'Coordinate not found' })
    }
}

module.exports.getDistanceTime = async (req, res , next) => {
    try {
        const errors = validationResult(req) 
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const { origin , destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination)

        res.status(200).json(distanceTime)

    } catch (error) {
        console.error("Error in getDistanceTime:", error) // Added context to console.error
        res.status(500).json({ message: "Internal server Error"})
    }
}

module.exports.getAutoSuggestion = async (req, res, next) =>{
    try {
        const errors = validationResult(req) // Changed variable name from 'error' to 'errors' for consistency
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        const { input } = req.query;
        const suggestion = await mapService.getAutoSuggestion(input)

        res.status(200).json(suggestion)
    } catch (error) {
        console.error("Error in getAutoSuggestion:", error) // Added context to console.error
        // --- CRITICAL FIX END ---
        res.status(500).json({ message: "Internal server Error"})
    }
}
