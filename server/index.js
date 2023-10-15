import express from 'express'
import cors from 'cors'
import { router } from './router/index.js'
import { connectToDatabase } from './db/index.js'
import { success, error } from './utils/chalk.js'
import 'dotenv/config'

// creating express app/server
const app = express()

const port = process.env.PORT || 5000

// enabling application/json headers
app.use(express.json()) 
// enabling cors policy
app.use(cors({
    origin: process.env.CLIENT_ORIGIN_URI,
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS"],
}))

// http://localhost:5000
app.use('/api/flights', router.flightRouter)
app.use('/api/passengers', router.passengerRouter)
app.use('/api/airports', router.airportRouter)
app.use('/api/planes', router.planeRouter)
// app.use('/api/departures', router.departureRouter)
app.use('/api/admins', router.adminRouter)

// Connecting to the database
connectToDatabase()
.then(() => console.log(success("[database] [success] Connected to database")))
.catch(() => console.log(error("[database] [error] Doesn't connected to database")))


// starting up the server
app.listen(port, () => {
    console.log(success(`[server] [success] Server has been started... \n[server] [success] URL: http://localhost:${port}`))
})
