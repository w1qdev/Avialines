import { Router } from "express";
import Flight from "../models/Flight.js";
import Airport from "../models/Airport.js";
import { createFlightNumber } from "../utils/createFlightNumber.js";


export const flightRouter = Router()

// http://localhost:5000/api/flights/
flightRouter.get('/', async (req, res) => {
    try {
        const allFlights = await Flight.find()

        if (!allFlights) {
            return res.send({ message: "There is no flights now" })
        }

        return res.send({ 
            message: "Found some flighs", 
            body: allFlights
        })
    } catch (e) {
        console.log("Some internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }  
})

// http://localhost:5000/api/flights/create
flightRouter.post('/create', async (req, res) => {
    try {
        const { departureAirportId } = req.body

        // FIXME: maybe this doesn't need here
        // const isFlightExists = await Flight.findOne({ flightNumber })
        
        // if (isFlightExists) {
        //     return res.send({ message: "This flight is already exists" })
        // }

        const depAirport = await Airport.findOne({ airportId: departureAirportId })

        if (!depAirport) {
            return res.send({ message: "This airport doen't exists" })
        }

        const newFlight = new Flight({ 
            ...req.body,
            departureAirportId: depAirport._id,
            flightId: Date.now().valueOf(),
            flightNumber: createFlightNumber()
        })

        await newFlight.save()
        .then(result => {
            return res.send({ message: "New flight has been seccessfully created" })
        })
        .catch(error => {
            console.error(error)
            return res.send({ message: "something gone wrong, flight maybe exists" })
        })
    } catch (e) {
        console.error("Some internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

// http://localhost:5000/api/flights/change
flightRouter.put('/change', async (req, res) => {
    try {
        const { flightNumber } = req.body

        const changedFlight = await Flight.findOneAndUpdate(
            { flightNumber }, 
            {...req.body})

        if (!changedFlight) {
            return res.send({ message: "Not found flight" })
        }

        return res.send({ message: `Flight ${flightNumber} has been successfully changed` })
    } catch (e) {
        console.log("Some internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

flightRouter.delete('/remove', async (req, res) => {
    try {
        const { flightNumber } = req.body

        const removeFlight = await Flight.findOneAndRemove({ flightNumber })

        if (!removeFlight) {
            return res.send({ message: "This flight is already doesn't exists" })
        }

        return res.send({ message: `Flight ${flightNumber} has been successfully removed` })
    } catch (e) {
        console.log("Some internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
    
})