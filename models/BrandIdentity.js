const mongoose = require('mongoose');

const BrandIdentitySchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    logoPreview: {
        type: String,
        required: false,
    },
    brandName: {
        type: String,
        required: false,
    },
    tagline: {
        type: String,
        required: false,
    },
    palette: [{
        type: String,
        required: false,
    }],
}, { timestamps: true });

module.exports = mongoose.model('brand_identity', BrandIdentitySchema);
