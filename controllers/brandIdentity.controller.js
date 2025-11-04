const BrandIdentity = require('../models/BrandIdentity');
const cloudinary = require('../utils/cloudinary');
const multer = require('../utils/multer');
const upload = require('../utils/multer');

module.exports = {
    updateBrandIdentity: (upload.single('logo'), async (req, res) => {
        try {
            const { id } = req.params;
            const { project, name, tagline, color } = req.body;
            let logo = req.file.path;
            if (req.file) {
                const result = await cloudinary.uploader.upload(logo, {
                    folder: 'brandIdentity',
                });
                logo = result.secure_url;
            }
            const brandIdentity = await BrandIdentity.findByIdAndUpdate(id, {
                project,
                logo,
                name,
                tagline,
                color,
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