import mongoose from 'mongoose'
const { Schema } = mongoose


const AdminActionsSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    action: {
        type: String,
        require: true,
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true })


const AdminActions = mongoose.model('Admin-actions', AdminActionsSchema)
export default AdminActions
