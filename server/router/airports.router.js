import { Router } from "express";
import Airport from '../models/Airport.js'


export const airportRouter = Router()


// [GET] http://localhost:5000/api/airports/
airportRouter.get('/', async (req, res) => {
    try {
        // geting all exists airplanes
        const airports = await Airport.find()

        if (!airports) {
            return res.send({ message: "There is no airports", body: airports })
        }

        return res.send({
            message: "Found some airports", 
            body: airports 
        })
    } catch(e) {
        console.error("Some Internal Error", e)
        return res.send({ message: "Some Internal Error" })
    }  
})


// [POST] http://localhost:5000/api/airports/create
airportRouter.post("/create", async (req, res) => {
    try {
        const { airportName } = req.body

        const AirportExists = await Airport.findOne({ airportName })

        if (AirportExists) {
            return res.send({ message: `The airport with id: ${AirportExists.airportId} already created` })
        }

        const newAirport = new Airport({
            airportId: Date.now().valueOf(), 
            ...req.body
        })

        console.log(newAirport)

        await newAirport.save()
        .then(() => {
            return res.send({ message: `The airport with id: ${newAirport.airportId} successfully created` })
        })
        .catch(() => {
            return res.send({ message: "New airport hasn't been successfully created" })
        })
    } catch (e) {
        console.error("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }  
})

// [PUT] http://localhost:5000/api/airports/change
airportRouter.put('/change', async (req, res) => {
    try {
        const { airportId } = req.body

        const chandedAirport = await Airport.findOneAndUpdate(
            { airportId },
            { ...req.body }) 
        
        if (!chandedAirport) {
            return res.send({ message: "This airport doesn't exists" })
        }

        return res.send({ message: `Airport ${chandedAirport.airportName}: ${airportId} changed` })
    } catch (e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})


// [DELETE] http://localhost:5000/api/airports/remove
airportRouter.put('/remove', async (req, res) => {
    try {
        const { airportId } = req.body

        const removedAirport = await Airport.findOneAndRemove({ airportId }) 
        
        if (!removedAirport) {
            return res.send({ message: "This airport doesn't exists" })
        }

        return res.send({ message: `airport ${airportId} successfully removed` })
    } catch (e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})




