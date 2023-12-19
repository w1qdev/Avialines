import Airport from "../models/Airport.js";
import Admin from "../models/Admin.js";
import Passenger from "../models/Passenger.js";
import Plane from "../models/Plane.js";
import Flight from "../models/Flight.js";
import { info, error } from "../utils/chalk.js";



const socketController = (socket) => {
    console.log(info(`user connected to the server...`))

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

            const flightPlaneType = await Plane.findOne({ id: allFlights.flightPlane })

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

    socket.on('isPassengersUpdate', (req) => {
        if (req.status) {
            socket.emit('passengersUpdate')
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
}

export default socketController;