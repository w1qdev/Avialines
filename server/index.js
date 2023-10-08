import express from 'express'
import { userRouter } from './router/users.router.js'
import { flightRouter } from './router/flights.router.js'
import { passengerRouter } from './router/passengers.router.js'
import { connectToDatabase } from './db/index.js'


const app = express()
const port = process.env.PORT || 5000


app.use(express.json())

// http://localhost:5000/api/users/create
app.use('/api/users', userRouter)
app.use('/api/flights', flightRouter)
app.use('/api/passengers', passengerRouter)



connectToDatabase()
.then(res => console.log("Connected to database"))
.catch(err => console.log("Doesn't connected to database"))


app.listen(port, () => {
    console.log("Server has been started...")
})

