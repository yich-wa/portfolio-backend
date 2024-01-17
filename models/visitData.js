import mongoose from 'mongoose'
const visitScheme = mongoose.Schema({
    date: {
        required: true,
        type: String,
    },
    ip: {
        required: true,
        type: String,
    },
    device: {
        required: true,
        type: String,
    },
    location: {
        required: true,
        type: Object
    }
})

export const Visiter = mongoose.model('Visiter', visitScheme)
