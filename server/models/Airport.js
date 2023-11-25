import mongoose from "mongoose";
const { Schema } = mongoose;

// Creating Airport Schema
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
    },
}, {timestamps: true})

// Creating Airport Model
const Airport = mongoose.model('Airport', AirportSchema);
export default Airport