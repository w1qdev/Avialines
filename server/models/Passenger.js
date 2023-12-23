import mongoose from "mongoose";
const { Schema } = mongoose


const PassengerSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        require: true
    },
    passport: {
        type: String,
        required: true 
    },
    flightNumber: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    destinationAirport: {
        type: String,
        required: true   
    },
    flightPrice: {
        type: String,
        required: true
    },
    flightTime: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    gate: {
        type: String,
        required: true,
    },
}, {timestamps: true})


const Passenger = mongoose.model('Passenger', PassengerSchema);
export default Passenger
