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
        required: false, // TODO: Switch to true when functionality done
    },
    busySeatCount: {
        type: Number,
        required: false // TODO: Switch to true when functionality done
    },
    status: {
        type: String,
        required: true,
        default: 'free'
    },
    planeCrew: [CrewSchema]
})


const Plane = mongoose.model('Plane', PlaneSchema);
export default Plane