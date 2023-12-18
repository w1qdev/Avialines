import express from 'express'
import cors from 'cors'
import { router } from './router/index.js'
import { connectToDatabase } from './db/index.js'
import { success, error, info } from './utils/chalk.js'
import socketController from './socket/socket.js'
import checkFlightStatusByTime from './utils/checkFlightsStatusByTime.js'
import { Server } from 'socket.io'
import http from 'http'
import 'dotenv/config'


// creating express app/server
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})
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
app.use('/api/admins', router.adminRouter)


// socket io connetions
io.on('connection', socketController)


// Connecting to the database
connectToDatabase()
.then(() => console.log(success("[database] [success] Connected to database")))
.catch(() => console.log(error("[database] [error] Doesn't connected to database")))


// starting up the server
server.listen(port, () => {
    console.log(success(`[server] [success] Server has been started... \n[server] [success] URL: http://localhost:${port}`))
    // checkFlightStatusByTime() FIXME: в разработке
})
