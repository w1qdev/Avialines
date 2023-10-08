import { Router } from 'express'


export const userRouter = Router()

// get post put delete
// http://localhost:5000/api/user/add-data
userRouter.get("/", (req, res) => {
    // TODO: get all users
})

userRouter.get("/:id", (req, res) => {
    // TODO: get current user using id
})

userRouter.post("/create", (req, res) => {
    // TODO: add new user
})

userRouter.put("/change", (req, res) => {
    // TODO: change data in user using userId
})

userRouter.delete("/remove", (req, res) => {
    // TODO: remove user using userId
})
