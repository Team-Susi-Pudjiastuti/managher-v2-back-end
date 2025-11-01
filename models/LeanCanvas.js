const mongoose = require('mongoose');

const LeanCanvasSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    problem: {
        type: mongoose.Schema.Types.Mixed,
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
        ref: 'business_idea',
        required: false,
    },
    unfairAdvantage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    keyMetrics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    revenueStreams: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    costStructure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    channels: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
}, { timestamps: true })

module.exports = mongoose.model('lean_canvas', LeanCanvasSchema);
