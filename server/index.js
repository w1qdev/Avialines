import express from 'express'
import { userRouter } from './router/users.router.js'
import { flightRouter } from './router/flights.router.js'
import { passengerRouter } from './router/passengers.router.js'


const app = express()
const port = process.env.PORT || 5000


app.use(express.json())

// http://localhost:5000/api/user/create
app.use('/api/users', userRouter)
app.use('/api/flights', flightRouter)
app.use('/api/passengers', passengerRouter)


app.listen(port, () => {
    console.log("Server has been started...")
})

