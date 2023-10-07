import { Router } from "express";

export const passengerRouter = Router()

passengerRouter.get('/:id', (req, res) => {
    // TODO: get all passengers of flight using flightId
})

passengerRouter.post('/create', (req, res) => {
    // TODO: add new passenger
})

passengerRouter.put('/change', (req, res) => {
    // TODO: change data of current flight and add 
})

passengerRouter.delete('/remove', (req, res) => {
    // TODO: remove data of current passenger
})