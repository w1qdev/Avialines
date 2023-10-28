import mongoose from 'mongoose'
const { Schema } = mongoose


const AdminPanelDataSchema = new Schema({
    totalFlightsCount: {
        type: String,
        required: true
    },
}, { timestamps: true })


const AdminPanelData = mongoose.model('Admin-panel-data', AdminPanelDataSchema)
export default AdminPanelData