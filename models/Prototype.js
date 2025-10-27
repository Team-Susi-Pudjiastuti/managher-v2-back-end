const mongoose = require('mongoose');

const PrototypeSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    productConcept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_concept',
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('prototype', PrototypeSchema);