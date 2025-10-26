const mongoose = require('mongoose');

const PhaseSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    name: {
        type: String,
        enum: ['plan', 'sell', 'scale_up'],
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['locked', 'in_progress', 'completed'],
        default: 'locked'
    },
    levels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Phase', PhaseSchema);
