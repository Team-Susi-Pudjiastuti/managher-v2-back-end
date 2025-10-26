const mongoose = require('mongoose');

 const BusinessIdeaSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    idea: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Makanan/Minuman', 'Jasa', 'Pakaian', 'Teknologi', 'Lainnya'],
        required: true,
    },
    marketPotential: {
        type: String,
        required: true,
    },
    problemSolved: {
        type: String,
        required: true,
    },
    solutionOffered: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('idea', BusinessIdeaSchema);
