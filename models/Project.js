const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    progress_percentage: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
