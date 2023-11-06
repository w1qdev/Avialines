import mongoose from "mongoose";
const { Schema } = mongoose

const CrewSchema = new Schema({
    id: {
        type: String,
        required: true
    }, 
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})


const SeatPlace = new Schema({
    id: {
        type: Number,
        required: true
    },
    seatName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'free'
    }
}) 


const PlaneSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    planeType: {
        type: String,
        required: true
    },
    seatCount: {
        type: Number,
        required: true,
        max: 512
    },
    freeSeatCount: {
        type: Number,
        required: false,
    },
    busySeatCount: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'free'
    },
    planeCompany: {
        type: String,
        required: true
    },
    planeCrew: [CrewSchema],
    seatPlaces: [SeatPlace]
})


const Plane = mongoose.model('Plane', PlaneSchema);
export default Plane