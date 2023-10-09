import express from 'express'
import { router } from './router/index.js'
import { connectToDatabase } from './db/index.js'

// creating express app/server
const app = express()
const port = process.env.PORT || 5000

// enabling application/json headers
app.use(express.json()) 

// http://localhost:5000/api
app.use('/api/flights', router.flightRouter)
app.use('/api/passengers', router.passengerRouter)
app.use('/api/airports', router.airportRouter)
app.use('/api/plane', router.planeRouter)
app.use('/api/departure', router.departureRouter)

// Connecting to the database
connectToDatabase()
.then(() => console.log("Connected to database"))
.catch(() => console.log("Doesn't connected to database"))

// starting up the server
app.listen(port, () => {
    console.log("Server has been started...")
})

