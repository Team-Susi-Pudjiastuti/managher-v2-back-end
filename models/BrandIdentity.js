const BrandIdSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    vision: {
        type: String,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('brand_identity', BrandIdSchema);
