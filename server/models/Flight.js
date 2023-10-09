import mongoose from "mongoose";
const { Schema } = mongoose


const FlightSchema = new Schema({
    flightNumber: {
        type: Number,
        ref: "Departure",
        required: true,
        unique: true
    },
    departureAirportId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "departureAirport"
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
    flightStatus: {
        type: String,
        required: true,
        default: "active"
    }
})

const Flight = mongoose.model('Flight', FlightSchema);
export default Flight



