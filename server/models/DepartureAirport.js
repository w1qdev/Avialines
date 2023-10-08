import mongoose from "mongoose";
const { Schema } = mongoose;

const departureAirportSchema = new Schema({
    airportId: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    }
})

const departureAirport = mongoose.model('departureAirport', departureAirportSchema);
export default departureAirport