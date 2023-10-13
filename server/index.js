import express from 'express'
import cors from 'cors'
import { router } from './router/index.js'
import { connectToDatabase } from './db/index.js'
import http from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'

// creating express app/server
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN_URI
    }
})
const port = process.env.PORT || 5000

// enabling application/json headers
app.use(express.json()) 
// enabling cors policy
app.use(cors({
    origin: process.env.CLIENT_ORIGIN_URI,
    methods: ["POST", "PUT", "GET", "DELETE"],
}))

// http://localhost:5000/api
app.use('/api/flights', router.flightRouter)
app.use('/api/passengers', router.passengerRouter)
app.use('/api/airports', router.airportRouter)
app.use('/api/planes', router.planeRouter)
// app.use('/api/departures', router.departureRouter)
app.use('/api/admins', router.adminRouter)

// Connecting to the database
connectToDatabase()
.then(() => console.log("Connected to database"))
.catch(() => console.log("Doesn't connected to database"))

// starting up the socket io server
io.on('connection', (socket) => {
    console.log("an admin connected")

    
    

    socket.on('disconnect', () => {
        console.log("admin disconnected")
    })
})


// starting up the server
server.listen(port, () => {
    console.log("Server has been started...")
})

