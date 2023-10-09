import express from 'express'
import { flightRouter } from './router/flights.router.js'
import { passengerRouter } from './router/passengers.router.js'
import { airportRouter } from './router/airports.router.js'
import { connectToDatabase } from './db/index.js'


const app = express()
const port = process.env.PORT || 5000


app.use(express.json()) 

// http://localhost:5000/api/flights/create
app.use('/api/flights', flightRouter)
app.use('/api/passengers', passengerRouter)
app.use('/api/airports', airportRouter)



connectToDatabase()
.then(res => console.log("Connected to database"))
.catch(err => console.log("Doesn't connected to database"))


app.listen(port, () => {
    console.log("Server has been started...")
})

