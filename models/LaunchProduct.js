const mongoose = require('mongoose');

const LaunchProductSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    launch_date: {
        type: Date,
        required: false,
    },
    productConcept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_concept',
        required: false,
    },
    brand_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand_identity',
        required: false,
    },
    brand_tagline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand_identity',
        required: false,
    },
    launch_channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lean_canvas',
        required: false,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('launch_product', LaunchProductSchema);
