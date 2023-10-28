import mongoose from "mongoose";
const { Schema } = mongoose


const FlightSchema = new Schema({
    flightId: {
        type: Number,
        required: true,
        unique: true
    },
    flightNumber: {
        type: String,
        required: true,
    },
    departureAirportId: {
        type: String, // FIXME: Schema.Types.ObjectId
        required: true,
        // FIXME: ref: "Airport"
    },
    departureAirport: {
        type: String,
        required: false,
    },
    destinationAirportId: {
        type: String,
        required: true
    },
    destinationAirport: {
        type: String,
        required: false
    },
    flightDuration: {   // FIXME: add functionality or remove it!!!
        type: Number,
        required: false 
    },
    flightPrice: {
        type: Number,
        required: true
    },
    flightStatus: {
        type: String,
        required: true,
        default: "load"
    },
    flightPlane: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Flight = mongoose.model('Flight', FlightSchema);
export default Flight



