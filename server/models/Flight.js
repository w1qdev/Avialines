import mongoose from "mongoose";
const { Schema } = mongoose


const FlightSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    flightNumber: {
        type: String,
        required: true
    },
    departureAirportId: {
        type: String,
        required: true
    },
    destinationAirportId: {
        type: String,
        required: true
    },
    flightDuration: {
        type: Number,
        required: true
    },
    flightPrice: {
        type: Number,
        required: true
    },
})

const Flight = mongoose.model('Flight', FlightSchema);
export default Flight



