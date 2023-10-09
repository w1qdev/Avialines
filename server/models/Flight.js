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
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Airport"
    },
    destinationAirportId: {
        type: Number,
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
}, {timestamps: true})

const Flight = mongoose.model('Flight', FlightSchema);
export default Flight



