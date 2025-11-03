const mongoose = require('mongoose');

 const BusinessIdeaSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    interest: {
        type: String,
        required: false,
    },
    idea: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: ['Makanan/Minuman', 'Jasa', 'Pakaian', 'Teknologi', 'Lainnya'],
        required: false,
    },
    features: [{
        type: Array,
        required: false,
    }],
    benefits: [{
        type: Array,
        required: false,
    }],
    problemSolved: {
        type: String,
        required: false,
    },
    solutionOffered: {
        type: String,
        required: false,
    },
    marketPotential: {
        type: String,
        required: false,
    },
    uniqueValueProposition: {
        type: String,
        required: false,
    },
    unfairAdvantage: {
        type: String,
        required: false,
    },
    keyMetrics: {
        type: String,
        required: false,
    },
    revenueStream: {
        type: String,
        required: false,
    },
    costStructure: {
        type: String,
        required: false,
    },
    channel: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('business_idea', BusinessIdeaSchema);
