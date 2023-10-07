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
    flightRange: {
        type: String,
        required: true
    }
})


const Plane = mongoose.model('Plane', PlaneSchema);
export default Plane