import mongoose from "mongoose";
const { Schema } = mongoose;

const AirportSchema = new Schema({
    airportId: {
        type: Number,
        required: true,
        unique: true
    },
    airportName: {
        type: String,
        required: true
    },
    airportPlace: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Airport = mongoose.model('Airport', AirportSchema);
export default Airport