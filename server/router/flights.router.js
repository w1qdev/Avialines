import { Router } from "express";
import { error } from '../utils/chalk.js'
import { createFlightNumber } from "../utils/createFlightNumber.js";
import Flight from "../models/Flight.js";
import Plane from '../models/Plane.js'
import Airport from "../models/Airport.js";


export const flightRouter = Router()

// [GET] http://localhost:5000/api/flights/
flightRouter.get('/', async (req, res) => {
    try {
        const allFlights = await Flight.find()

        if (!allFlights) {
            return res.send({ error: "Рейсов не найдено" })
        }

        return res.send({ 
            message: "Found some flighs", 
            body: {
                ...allFlights,
                flightPlaneType
            }
        })
    } catch (e) {
        console.log(error("Some internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }  
})

// [POST] http://localhost:5000/api/flights/create
flightRouter.post('/create', async (req, res) => {
    try {
        const { departureAirportId, destinationAirportId, planeId } = req.body

        const depAirport = await Airport.findOne({ airportId: departureAirportId })
        const desAirport = await Airport.findOne({ airportId: destinationAirportId })
        const flightPlane = await Plane.findOne({ id: planeId })

        if (!depAirport || !desAirport) {
            return res.send({ error: "Одного из аэрапортов не существует",  })
        }

        if (!flightPlane) {
            return res.send({ error: "Этого самолета не существует" })
        } 

        if (flightPlane.status === 'busy') {
            return res.send({ error: "Этот самолет уже занят на рейс" })
        }

        const id = Date.now().valueOf()
        
        const newFlight = new Flight({
            flightId: id,
            flightNumber: createFlightNumber(),
            flightPlane: flightPlane.id,
            flightPlaneType: flightPlane.planeType,
            ...req.body
        })

        await Plane.findOneAndUpdate({ id: planeId }, { status: 'busy' }) 

        await newFlight.save()
        .then(async result => {
            return res.send({ message: "Новый рейс был успешно создан" })
        })
        .catch(error => {
            console.error(error)
            return res.send({ error: "Что-то пошло не так, возможно такой рейс уже существует" })
        })
    } catch (e) {
        console.log(error("Some internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

// [PUT] http://localhost:5000/api/flights/change
flightRouter.put('/change', async (req, res) => {
    try {
        const { flightNumber, lastFlightPlane, flightPlane } = req.body
        
        const changedFlight = await Flight.findOneAndUpdate({ 
            flightNumber 
        }, 
        { ...req.body })

        if (!changedFlight) {
            return res.send({ error: "Данный рейс не найден" })
        }

        await Plane.findOneAndUpdate({ id: flightPlane }, {
            status: 'busy'
        })

        await Plane.findOneAndUpdate({ id: lastFlightPlane }, {
            status: 'free',
            busySeatCount: 0
        })


        return res.send({ message: `Flight ${flightNumber} has been successfully changed` })
    } catch (e) {
        console.log(error("Some internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

// [DELETE] http://localhost:5000/api/flights/remove
flightRouter.delete('/remove/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId
        const removeFlight = await Flight.findOne({ flightNumber: itemId })

        const flightPlane = await Plane.findOneAndUpdate({ 
            id: removeFlight.flightPlane 
        }, {
            status: 'free',
            busySeatCount: 0
        })

        if (!removeFlight) {
            return res.send({ error: "Данный рейс не существует" })
        }

        if (!flightPlane) {
            return res.send({ error: "Что-то пошло не так, попробуйте позже" })
        }

        await Flight.findOneAndRemove({ flightNumber: itemId })

        return res.send({ message: `Flight ${itemId} has been successfully removed` })
    } catch (e) {
        console.log(error("Some internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})