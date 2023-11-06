import mongoose from "mongoose";
const { Schema } = mongoose


const PassengerSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    departureId: {
        type: String,
        required: true
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
        required: false          
    }
}, {timestamps: true})


const Passenger = mongoose.model('Passenger', PassengerSchema);
export default Passenger
