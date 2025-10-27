const mongoose = require('mongoose');

const ProductConceptSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    feature: {
        type: Array,
        required: true,
    },
    benefit: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unfairAdvantage: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('product_concept', ProductConceptSchema);
