const mongoose = require('mongoose');

const LeanCanvasSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    customerSegment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    uniqueValuePropositionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    solution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_concept',
        required: false,
    },
    unfairAdvantage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_concept',
        required: false,
    },
    keyMetrics: {
        type: String,
        required: false,
    },
    revenueStreams: {
        type: String,
        required: false,
    },
    costStructure: {
        type: String,
        required: false,
    },
    channels: {
        type: String,
        required: false,
    },
}, { timestamps: true })

module.exports = mongoose.model('lean_canvas', LeanCanvasSchema);
