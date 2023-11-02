import express from 'express'
import cors from 'cors'
import { router } from './router/index.js'
import { connectToDatabase } from './db/index.js'
import { success, error, info } from './utils/chalk.js'
import Airport from './models/Airport.js'
import Flight from './models/Flight.js'
import Plane from './models/Plane.js'
import Passenger from './models/Passenger.js'
import Admin from './models/Admin.js'
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
// TODO: Refactor it
io.on('connection', (socket) => {
    console.log(info(`Someone connected to the server...`))

    // AIRPORTS
    socket.on('airportsDataGet', async () => {
        try {
            const airports = await Airport.find()

            if (!airports) {
                socket.emit('airportsResponse', { error: "There is no airports", body: airports })
                return
            }

            socket.emit('airportsResponse', { message: "Found some airports", body: airports })
        } catch(e) {
            console.error(error("Some Internal Error", e))
            socket.emit('airportsResponse', { error: "Some Internal Error" })
        }  
    })


    socket.on('isAirportsUpdate', (req) => {
        if (req.status) {
            socket.emit('airportsUpdate')
        }
    })


    // ADMINS
    socket.on('adminsDataGet', async (req) => {
        // TODO: Get all admin data
        try {
            const allAdmins = await Admin.find()
            
            socket.emit('adminsResponse', { body: allAdmins })
        } catch (e) {
            console.log(error(`Some Internal Error ${e}`))
            socket.emit('adminsResponse', { error: "Some Internal Error" })
        }
    })

    socket.on('isAdminsUpdate', (req) => {
        if (req.status) {
            socket.emit('adminsUpdate')
        }
    })
  

    // FLIGHTS
    socket.on('flightsDataGet', async (req) => {
        // TODO: Get all flights data
        try {
            const allFlights = await Flight.find()
    
            if (!allFlights) {
                socket.emit('flightsResponse', { error: "There is no flighs now" })
                return
            }
            
            socket.emit('flightsResponse', { 
                message: "There is no flighs now", 
                body: allFlights 
            }) 
        } catch (e) {
            console.log(error("Some internal Error", e))
            socket.emit('flightsResponse', { error: "Some Internal Error", status: 500 })
            return
        }  

    })

    socket.on('isFlightsUpdate', (req) => {
        if (req.status) {
            socket.emit('flightsUpdate')
        }
    })


    // PASSENGERS
    socket.on('passengersDataGet', async (req) => {
        // TODO: get all passengers data
        try {
            // Getting all exists passengers 
            const allPassengers = await Passenger.find()
    
            if (!allPassengers) {
                socket.emit('passengersResponse', { message: "There is no passengers" })
                return
            }
            
            socket.emit('passengersResponse', { body: allPassengers })
        } catch (e) {
            console.log(error("Some Internal Error", e))
            socket.emit('passengersResponse', { error: "Some Internal Error", satus: 500 })
        }
    })


    // PLANES
    socket.on('planesDataGet', async (req) => {
        // TODO: get all planes data
        try {
            const allPlanes = await Plane.find();
            
            socket.emit('planesResponse', { body: allPlanes })
        } catch(e) {
            console.log(error("Some Internal Error", e))
            return res.send({ error: "Some Internal Error", status: 500 })
        }        
    })

    socket.on('isPlanesUpdate', (req) => {
        if (req.status) {
            socket.emit('planesUpdate')
        }
    })


    socket.on('disconnect', (socket) => {
        console.log(info(`Someone disconnected from the server...`))
    })
})




// Connecting to the database
connectToDatabase()
.then(() => console.log(success("[database] [success] Connected to database")))
.catch(() => console.log(error("[database] [error] Doesn't connected to database")))


// starting up the server
server.listen(port, () => {
    console.log(success(`[server] [success] Server has been started... \n[server] [success] URL: http://localhost:${port}`))
})
