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
    destinationAirportId: {
        type: String,
        required: true
    },
    flightDuration: {
        type: Number,
        required: false // FIXME: add functionality or remove it!!!
    },
    flightPrice: {
        type: Number,
        required: true
    },
    flightStatus: {
        type: String,
        required: true,
        default: "active"
    },
    flightPlane: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Flight = mongoose.model('Flight', FlightSchema);
export default Flight



