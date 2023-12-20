import { Router } from "express";
import { error } from '../utils/chalk.js'
import Airport from '../models/Airport.js'


export const airportRouter = Router()


// [GET] http://localhost:5000/api/airports/
airportRouter.get('/', async (req, res) => {
    try {
        // geting all exists airplanes
        const airports = await Airport.find()

        if (!airports) {
            return res.send({ error: "Аэрапортов не найдено", body: airports })
        }

        return res.send({
            message: "Found some airports", 
            body: airports 
        })
    } catch(e) {
        console.error(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error" })
    }  
})


// [POST] http://localhost:5000/api/airports/create
airportRouter.post("/create", async (req, res) => {
    try {
        const { airportName } = req.body
        
        console.log(airportName)
        const AirportExists = await Airport.findOne({ airportName })

        if (AirportExists) {
            return res.send({ error: `Аэропорт "${airportName}" уже создан` })
        }

        const newAirport = new Airport({
            airportId: Date.now().valueOf(), 
            ...req.body
        })

        await newAirport.save()
        .then(() => {
            
            return res.send({ message: `The airport with id: ${newAirport.airportId} successfully created` })
        })
        .catch(() => {
            return res.send({ error: "New airport hasn't been successfully created" })
        })
    } catch (e) {
        console.error(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
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
            return res.send({ error: "Данный аэрапорт не существует" })
        }

        return res.send({ message: `Airport ${chandedAirport.airportName}: ${airportId} changed` })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})


// [DELETE] http://localhost:5000/api/airports/remove
airportRouter.delete('/remove/:airportId', async (req, res) => {
    try {
        const { airportId } = req.params

        const removedAirport = await Airport.findOneAndRemove({ airportId }) 
        
        if (!removedAirport) {
            return res.send({ error: "Данный аэрапорт не существует" })
        }

        return res.send({ message: `airport ${airportId} successfully removed` })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})




