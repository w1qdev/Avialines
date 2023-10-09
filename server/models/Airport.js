import mongoose from "mongoose";
const { Schema } = mongoose;

const AirportSchema = new Schema({
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

const Airport = mongoose.model('Airport', AirportSchema);
export default Airport