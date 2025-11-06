const BrandIdentity = require('../models/BrandIdentity');
const cloudinary = require('../utils/cloudinary');

module.exports = {
    updateBrandIdentityLogoPreview: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'brandIdentity' });
            await BrandIdentity.findByIdAndUpdate(id, { logoPreview: result.secure_url });
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    updateBrandIdentity: async (req, res) => {
        try {
            const { id } = req.params;
            const { brandName, tagline, palette } = req.body;
            const brandIdentity = await BrandIdentity.findByIdAndUpdate(id, {
                brandName,
                tagline,
                palette,
            });
            res.status(200).json({
                message: 'Brand Identity updated',
                data: brandIdentity,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getBrandIdentity: async (req, res) => {
        try {
            const { project } = req.params;
            const brandIdentity = await BrandIdentity.find({ project });
            res.status(200).json({
                message: 'Brand Identity found',
                data: brandIdentity,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}