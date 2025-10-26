const mongoose = require('mongoose');

const LeanCanvasSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessIdea',
        required: true,
    },
    customerSegment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessIdea',
        required: true,
    },
    uniqueValueProposition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessIdea',
        required: true,
    },
    solution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductConcept',
        required: true,
    },
    unfairAdvantage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductConcept',
        required: true,
    },
    keyMetrics: {
        type: String,
        required: true,
    },
    revenueStreams: {
        type: String,
        required: true,
    },
    costStructure: {
        type: String,
        required: true,
    },
    channels: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('lean_canvas', LeanCanvasSchema);
