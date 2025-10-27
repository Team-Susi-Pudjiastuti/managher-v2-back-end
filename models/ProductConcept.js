const mongoose = require('mongoose');

const ProductConceptSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    name: {
        type: String, 
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    feature: [{
        type: Array,
        required: false,
    }],
    benefit: [{
        type: Array,
        required: false,
    }],
    price: {
        type: Number,
        required: false,
    },
    unfairAdvantage: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('product_concept', ProductConceptSchema);
