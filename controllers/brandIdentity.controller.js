const BrandIdentity = require('../models/BrandIdentity');
const cloudinary = require('../utils/cloudinary');
const multer = require('../utils/multer');
const upload = require('../utils/multer');

module.exports = {
    updateBrandIdentity: (upload.single('logo'), async (req, res) => {
        try {
            const { id } = req.params;
            const { project, logoPreview, brandName, tagline, palette } = req.body;
            const brandIdentity = await BrandIdentity.findByIdAndUpdate(id, {
                project,
                logoPreview,
                brandName,
                tagline,
                palette,
            }, { new: true });
            res.status(200).json({
                message: 'Brand Identity updated',
                data: brandIdentity,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),

    getBrandIdentity: async (req, res) => {
        const { project } = req.params;
        try {
            const brandIdentity = await BrandIdentity.find({project});
            res.status(200).json({
                message: 'Brand Identity found',
                data: brandIdentity,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}