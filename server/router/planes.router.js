import { Router } from "express";
import { error } from '../utils/chalk.js'
import Plane from '../models/Plane.js'
import Flight from '../models/Flight.js'
import { getRandomNumber } from "../utils/getRandomNumber.js";
import { getPlanePlaces } from "../utils/getPlanePlaces.js";


export const planeRouter = Router()

// [GET] http://localhost:5000/api/plane/
planeRouter.get('/', async (req, res) => {
    try {
        // TODO: get all planes
        const allPlanes = await Plane.find();

        return res.send({ message: "Planes", body: allPlanes })
    } catch(e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

planeRouter.get('/free', async (req, res) => {
    try {
        const freePlanes = await Plane.find({ status: 'free' });

        return res.send({ message: "Planes", body: freePlanes })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

planeRouter.get('/busy', async (req, res) => {
    try {
        const busyPlanes = await Plane.find({ status: 'busy' });

        return res.send({ message: "Planes", body: busyPlanes })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

planeRouter.get('/plane/:flightNumber', async (req, res) => {
    try {
        const { flightNumber } = req.params

        const currentFlight = await Flight.findOne({ flightNumber })

        if (!currentFlight) {
            return res.send({ message: "Рейса с таким номером не существует" })
        }

        const currentPlane = await Plane.findOne({ planeType: currentFlight.flightPlaneType })

        return res.send({ body: currentPlane?.seatPlaces })
    } catch (e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})


// [POST] http://localhost:5000/api/plane/create
planeRouter.post('/create', async (req, res) => {
    try {
        const { seatCount } = req.body

        // for (let i = 0; i < crew.length; i++) {
        //     crew[i].id = Date.now().valueOf() + getRandomNumber(999)
        // }

        const detailedPlanePlaces = getPlanePlaces(seatCount)

        const newPlane = new Plane({
            ...req.body,
            id: Date.now().valueOf(),
            seatPlaces: [...detailedPlanePlaces],
            freeSeatCount: seatCount,
            busySeatCount: 0
            // planeCrew: [...crew],
        })

        newPlane.save()
        .then(() => {
            return res.send({ message: `New plane with id ${newPlane.id} successfully created` })
        })
        .catch(() => {
            return res.send({ error: "Something gome wrong" })
        })

    } catch(e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

// [PUT] http://localhost:5000/api/plane/change
planeRouter.put('/change', async (req, res) => {
    try {
        // TODO: change data in plane
        const { id } = req.body

        const changedPlane = await Plane.findOneAndUpdate({ id }, {...req.body})

        if (!changedPlane) {
            return res.send({ error: "This plane is not exists" })
        }

        return res.send({ message: `Plane ${changedPlane.id} successfully changed` })

    } catch(e) {
        console.log("Some Internal Error", e)
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

// [delete] http://localhost:5000/api/plane/remove
planeRouter.delete('/remove/:planeId', async (req, res) => {
    try {
        // TODO: remove plane
        const planeId = req.params.planeId

        const removedPlane = await Plane.findOneAndRemove({ id: planeId })

        if (!removedPlane) {
            return res.send({ error: "This plane doesn't exists" })
        }

        return res.send({ message: `The plane ${removedPlane.id} succeessfully removed` })
    } catch(e) {
        console.log(error("Some Internal Error", e))
        return res.send({ error: "Some Internal Error", status: 500 })
    }
})

