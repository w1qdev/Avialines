import { Router } from "express";

export const planeRouter = Router()

// [GET] http://localhost:5000/api/plane/
planeRouter.get('/', (req, res) => {
    try {
        // TODO: get all planes


    } catch(e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

// [POST] http://localhost:5000/api/plane/create
planeRouter.post('/create', (req, res) => {
    try {
        // TODO: create new plane


    } catch(e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

// [PUT] http://localhost:5000/api/plane/change
planeRouter.put('/change', (req, res) => {
    try {
        // TODO: change data in plane


    } catch(e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

// [delete] http://localhost:5000/api/plane/remove
planeRouter.delete('/remove', (req, res) => {
    try {
        // TODO: remove plane


    } catch(e) {
        console.log("Some Internal Error", e)
        return res.send({ message: "Some Internal Error", status: 500 })
    }
})

