const mongoose = require('mongoose')
const validator = require('validator')

const examinationSchema = new mongoose.Schema({
    medical_examination: {
        type: String,
        required: true,
        trim: true,
    },

    doctor: {
        type: String,
        required: true,
        trim: true,
    },

    user: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },
    doc_for_receipe: {
        type: String,
        trim: true,
    },
    doc_for_delivery: {
        type: String,
        trim: true,
    },
    completed: {
        default: false,
        type: Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})



const Examination = mongoose.model('Examination', examinationSchema)

module.exports = Examination