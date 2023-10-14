import mongoose from "mongoose";
const { Schema } = mongoose


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
    status: {
        type: String,
        required: true,
        default: 'free'
    }
})


const Plane = mongoose.model('Plane', PlaneSchema);
export default Plane