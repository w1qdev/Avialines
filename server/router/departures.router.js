import { Router } from "express";
import { error } from '../utils/chalk.js'
import Departure from '../models/Departure.js'


export const departureRouter = Router()

// [GET] http://localhost:5000/api/departures/
departureRouter.get('/', async (req, res) => {
    try {
        // TODO: get all departures
        const allDepartures = await Departure.find()

        return res.send({ 
            message: "Found some departures", 
            body: allDepartures 
        })
    } catch(e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

// [POST] http://localhost:5000/api/departures/create
departureRouter.post('/create', (req, res) => {
    try {
        // TODO: create new departure
        const {  } = req.body

    } catch(e) {
        console.log(error("Some Internal Error", e))
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

// [PUT] http://localhost:5000/api/departures/change
departureRouter.put('/change', (req, res) => {
    try {
        // TODO: change data in departure


    } catch(e) {
        console.log(error("Some Internal Error", e))
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

// [DELETE] http://localhost:5000/api/departures/remove
departureRouter.delete('/remove', (req, res) => {
    try {
        // TODO: remove departure


    } catch(e) {
        console.log(error("Some Internal Error", e))
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})
