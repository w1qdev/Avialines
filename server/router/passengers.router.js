import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { error } from '../utils/chalk.js'
import Passenger from "../models/Passenger.js";
import Flight from "../models/Flight.js";
import Plane from "../models/Plane.js";


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
        const { passportSeries, passportNumber } = req.body
        
        const passportData = `${passportSeries} ${passportNumber}`

        const isNewPassenger =  await Passenger.findOne({ passport: passportData})

        if (isNewPassenger != null) {
            return res.send({ error: "Это уже зарегистрированный пассажир" })
        }

        const currentFlight = await Flight.findOne({ flightNumber: req.body.flightInfo.flightNumber })
        const currentPlane = await Plane.findOne({ id: currentFlight.flightPlane })

        // change free and busy places in the plane
        const busySeatCount = currentPlane.busySeatCount;
        const freeSeatCount = currentPlane.freeSeatCount;   

        for (let i = 0; i < currentPlane.seatPlaces.length; i++) {
            if (currentPlane.seatPlaces[i].seatName == req.body.seatNumber) {
                currentPlane.seatPlaces[i].status = 'busy'
            }
        }

        await Plane.findOneAndUpdate({ id: currentFlight.flightPlane }, { 
            busySeatCount: busySeatCount + 1, 
            freeSeatCount: freeSeatCount - 1,
            seatPlaces: [ ...currentPlane.seatPlaces ]
        })


        // creating new passenger
        const passenger = new Passenger({ 
            id: uuidv4(),
            passport: passportData,
            ...req.body,
            ...req.body.flightInfo
        }) 

        await passenger.save()
        .then(() => {
            return res.send({ message: "New user has been successfully created" })
        })
        .catch(err => {
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
        const { id, fullName } = req.body  

        // change data about passenger
        const existsPassenger = await Passenger.findOneAndUpdate({ id }, {
            fullName
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
passengerRouter.delete('/remove/:id', async (req, res) => {
    try {
        const passenegerId = req.params.id

        // remove the passenger
        const removePassenger = await Passenger.findOneAndRemove({ id: passenegerId })

        if (!removePassenger) {
            return res.send({ error: "Something gone wrong, passenger hasn't removed" })
        }

        return res.send({ message: "passenger successfully removed" })  
    } catch (e) {
        console.error("Some Internal Error", e)
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})