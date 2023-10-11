import mongoose from "mongoose";
const { Schema } = mongoose;


const AdminSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    secretWord: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "subAdmin"
    }
})


// Creating Admin Model
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;