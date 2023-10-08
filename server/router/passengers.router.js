import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import Passenger from "../models/Passenger.js";


export const passengerRouter = Router()

passengerRouter.get('/:id', (req, res) => {
    // TODO: get all passengers of flight using flightId
})

passengerRouter.post('/create', async (req, res) => {
    // TODO: add new passenger

    const { seatNumber, fullName, passport } = req.body

    const passenger = new Passenger({ 
        id: uuidv4(),
        departureId: uuidv4(),
        seatNumber,
        fullName,
        passport
    }) 

    await passenger.save().then(() => {
        console.log("new passenger saved successfully...")
    })


    return res.send({ message: "new user has been successfully created" }).status(200)
})

passengerRouter.put('/change', (req, res) => {
    // TODO: change data of current flight and add 
})

passengerRouter.delete('/remove', (req, res) => {
    // TODO: remove data of current passenger
})