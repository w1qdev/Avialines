import { Router } from "express";
import Flight from "../models/Flight.js";
import Plane from '../models/Plane.js'
import Airport from "../models/Airport.js";
import { createFlightNumber } from "../utils/createFlightNumber.js";


export const flightRouter = Router()

// [GET] http://localhost:5000/api/flights/
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

// [POST] http://localhost:5000/api/flights/create
flightRouter.post('/create', async (req, res) => {
    try {
        const { departureAirportId, destinationAirportId, planeId } = req.body

        // FIXME: maybe this doesn't need here

        const depAirport = await Airport.findOne({ airportId: departureAirportId })
        const desAirport = await Airport.findOne({ airportId: destinationAirportId })
        const flightPlane = await Plane.findOne({ id: planeId })


        if (!depAirport || !desAirport) {
            return res.send({ message: "Одного из аэрапортов не существует" })
        }

        if (!flightPlane) {
            return res.send({ message: "Этого самолета не существует" })
        } 
        if (flightPlane.status === 'busy') {
            return res.send({ message: "Этот самолет уже занят на рейс" })
        }

        // TEST FIXME: debug
        const newFlight = new Flight({
            flightId: Date.now().valueOf(),
            flightNumber: createFlightNumber(),
            flightPrice: 5000,
            flightPlane: flightPlane.id,
            ...req.body
        })

        await Plane.findOneAndUpdate({ id: planeId }, { status: 'busy' }) 

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

// [PUT] http://localhost:5000/api/flights/change
flightRouter.put('/change', async (req, res) => {
    try {
        const { flightNumber } = req.body // ABC1234
        
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

// [DELETE] http://localhost:5000/api/flights/remove
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