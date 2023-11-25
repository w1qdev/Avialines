import { Router } from "express";
import { error } from '../utils/chalk.js'
import { createFlightNumber } from "../utils/createFlightNumber.js";
import Flight from "../models/Flight.js";
import Plane from '../models/Plane.js'
import Airport from "../models/Airport.js";
import saveAdminActions from "../db/saveAdminActions.js";



export const flightRouter = Router()

// [GET] http://localhost:5000/api/flights/
flightRouter.get('/', async (req, res) => {
    try {
        const allFlights = await Flight.find()

        if (!allFlights) {
            return res.send({ error: "There is no flights now" })
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

        console.log(req.body)

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

        console.log(newFlight)

        await Plane.findOneAndUpdate({ id: planeId }, { status: 'busy' }) 

        await newFlight.save()
        .then(async result => {
            
            saveAdminActions(req.body.adminFullName, `Создание нового рейса: ${newFlight.flightNumber}`, req.body.timestamp)

            return res.send({ message: "New flight has been seccessfully created" })
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
        const { flightNumber } = req.body
        
        const changedFlight = await Flight.findOneAndUpdate({ 
            flightNumber 
        }, 
        { ...req.body })

        if (!changedFlight) {
            return res.send({ error: "Not found flight" })
        }

        // saveAdminActions(req.body.adminFullName, `Изменение данных рейса: ${flightNumber}`, req.body.timestamp)

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
        const removeFlight = await Flight.findOneAndRemove({ flightNumber: itemId })

        const flightPlane = await Plane.findOneAndUpdate({ 
            id: removeFlight.flightPlane 
        }, {
            status: 'free',
            busySeatCount: 0
        })

        if (!removeFlight) {
            return res.send({ error: "This flight is already doesn't exists" })
        }

        if (!flightPlane) {
            return res.send({ error: "Something gone wrong" })
        }

        return res.send({ message: `Flight ${itemId} has been successfully removed` })
    } catch (e) {
        console.log(error("Some internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})