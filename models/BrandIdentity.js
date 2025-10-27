const mongoose = require('mongoose');

const BrandIdentitySchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    tagline: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    vision: {
        type: String,
        required: false,
    },
    mission: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('brand_identity', BrandIdentitySchema);
