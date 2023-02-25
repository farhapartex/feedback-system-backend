const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const feedbackSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    department: {
        type: departmentSchema,
        required: true
    },
    isApprovedByAdmin: {
        type: Boolean,
        default: false,

    },
    isResolved: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = {
    Department: mongoose.model('Department', departmentSchema),
    Feedback: mongoose.model('Feedback', feedbackSchema)
};