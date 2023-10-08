import mongoose from "mongoose";
const { Schema } = mongoose


const DepartureSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    flightId: {
        type: Number,
        required: true
    },
    departureTime: { 
        type: Date, 
        default: Date.now,
        required: true
    },
    planeId: {
        type: Number,
        required: true
    },
    сrewCommander: {
        type: String,
        required: true
    }
})

const Departure = mongoose.model('Departure', DepartureSchema);
export default Departure
