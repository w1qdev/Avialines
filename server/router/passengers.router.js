import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import Passenger from "../models/Passenger.js";


export const passengerRouter = Router()

passengerRouter.get('/:id', (req, res) => {
    // TODO: get all passengers of flight using flightId
})

// create new passenger
passengerRouter.post('/create', async (req, res) => {
    const { passport } = req.body

    const isNewPassenger =  await Passenger.findOne({ "passport": passport })

    if (isNewPassenger ) {
        return res.send({ message: "This user already passenger" })
    }

    const passenger = new Passenger({ 
        id: uuidv4(),
        departureId: uuidv4(),
        ...req.body
    }) 

    await passenger.save().then(() => {
        console.log("new passenger saved successfully...")
    })

    return res.send({ message: "new user has been successfully created" }).status(200)
})

// change data about passenger
passengerRouter.put('/change', async (req, res) => {
    const { passport, seatNumber } = req.body  
    // FIXME: Нужно получать только изменяемые данные!

    const existsPassenger = await Passenger.findOneAndUpdate({ "passport": passport }, {
        seatNumber, ...req.body 
    })

    if (!existsPassenger) {
        return res.send({ message: "Something gone wrong" })
    }

    return res.send({ message: "The user data successfully changed" })
})

// remove some passenger
passengerRouter.delete('/remove', async (req, res) => {
    const { passport } = req.body

    const removePassenger = await Passenger.findOneAndRemove({ passport })

    if (!removePassenger) {
        return res.send({ message: "Something gone wrong, passenger hasn't removed" })
    }

    return res.send({ message: "passenger successfully removed" })
    
})