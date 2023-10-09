import mongoose from "mongoose";
const { Schema } = mongoose

const CrewSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

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
        default: Date.now(),
        required: true
    },
    planeId: {
        type: Number,
        required: true
    },
    сrew: [CrewSchema]
})

const Departure = mongoose.model('Departure', DepartureSchema);
export default Departure
