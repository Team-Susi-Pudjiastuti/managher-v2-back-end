const mongoose = require('mongoose');

const LaunchProductSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    levels: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
        required: false,
    },
    checklist: [{
        title: {
            type: String,
            required: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    }]
    
}, { timestamps: true });

module.exports = mongoose.model('launch_product', LaunchProductSchema);
