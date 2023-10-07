import mongoose from "mongoose";
const { Schema } = mongoose


const PassengerSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    departureId: {
        type: Number,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        require: true
    },
    passport: {
        type: String,   // TODO: спросить насчет того, что здесь будет, строка, или числа 
        required: true 
    }
})


const Passenger = mongoose.model('Passenger', PassengerSchema);
export default Passenger
