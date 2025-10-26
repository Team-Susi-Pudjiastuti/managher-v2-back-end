const mongoose = require('mongoose');

 const BusinessIdeaSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
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
    marketPotential: {
        type: String,
        required: false,
    },
    problemSolved: {
        type: String,
        required: false,
    },
    solutionOffered: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('business_idea', BusinessIdeaSchema);
