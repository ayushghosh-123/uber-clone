const mapService = require('../Services/maps.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async(req, res, next) => {
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() })
    }

    const {address} = req.query;

    try{
        const coordinate = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinate)
    }catch(err){
        res.status(404).json({ message: 'Coordinate not found'})
    }
}

module.exports.getDistanceTime = async (req, res , next) => {
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array()})
        }

        const { origin , destination } = req.query;
        const distanceTime =  await mapService.getDistanceTime(origin, destination)

        res.status(200).json(distanceTime)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server Error"})
    }
}

module.exports.getAutoSuggestion = async (req, res, next) =>{
    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array()})
        }

        const { input } = req.query;
        const suggestion =  await mapService.getAutoSuggestion(input)

        res.status(200).json(suggestion)
    } catch (error) {
         console.error(or)
        res.status(500).json({ message: "Internal server Error"})
    }
}