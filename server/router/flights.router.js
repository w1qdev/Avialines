import { Router } from "express";

export const flightRouter = Router()


flightRouter.get('/', (req, res) => {
    // TODO: get all flights
})

flightRouter.post('/create', (req, res) => {
    // TODO: create new flight
})

flightRouter.put('/change', (req, res) => {
    // TODO: change data of current flight
})

flightRouter.delete('/remove', (req, res) => {
    // TODO: delete data of current flight
})