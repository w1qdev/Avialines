import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { error } from '../utils/chalk.js'
import Passenger from "../models/Passenger.js";


export const passengerRouter = Router()

// [GET] http://localhost:5000/api/passengers/
passengerRouter.get('/', async (req, res) => {
    try {
        // Getting all exists passengers 
        const allPassengers = await Passenger.find()

        if (!allPassengers) {
            return res.send({ message: "There is no passengers" })
        }

        return res.send({ 
            message: "Found some passengers", 
            body: allPassengers 
        })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", satus: 500 })
    }
})

// [POST] http://localhost:5000/api/passengers/create
passengerRouter.post('/create', async (req, res) => {
    try {
        const { passport } = req.body

        const isNewPassenger =  await Passenger.findOne({ "passport": passport })

        if (isNewPassenger ) {
            return res.send({ error: "This user already passenger" })
        }

        // creating new passenger
        const passenger = new Passenger({ 
            id: uuidv4(),
            departureId: uuidv4(),
            ...req.body
        }) 

        await passenger.save()
        .then(() => {
            return res.send({ message: "New user has been successfully created" })
        })
        .catch(() => {
            return res.send({ error: "New user hasn't been successfully created" })
        })
    } catch (e) {
        console.error(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500})
    }
})

// [PUT] http://localhost:5000/api/passengers/change
passengerRouter.put('/change', async (req, res) => {
    try {
        const { passport, seatNumber } = req.body  

        // change data about passenger
        const existsPassenger = await Passenger.findOneAndUpdate({ "passport": passport }, {
            seatNumber, ...req.body 
        })

        if (!existsPassenger) {
            return res.send({ error: "Something gone wrong" })
        }

        return res.send({ message: "The user data successfully changed" })
    } catch (e) {
        console.error(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500})
    }  
})

// [DELETE] http://localhost:5000/api/passengers/remove
passengerRouter.delete('/remove', async (req, res) => {
    try {
        const { passport } = req.body

        // remove the passenger
        const removePassenger = await Passenger.findOneAndRemove({ passport })

        if (!removePassenger) {
            return res.send({ error: "Something gone wrong, passenger hasn't removed" })
        }

        return res.send({ message: "passenger successfully removed" })  
    } catch (e) {
        console.error("Some Internal Error", e)
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})