const BrandIdentity = require('../models/BrandIdentity');

module.exports = {
    updateBrandIdentity: async (req, res) => {
        const { id } = req.params;
        const { project, logo, name, tagline, description, vision, mission, color } = req.body;
        try {
            const brandIdentity = await BrandIdentity.findByIdAndUpdate(id, {
                project,
                logo,
                name,
                tagline,
                description,
                vision,
                mission,
                color,
            }, { new: true });
            res.status(200).json({
                message: 'Brand Identity updated',
                brandIdentity,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getBrandIdentity: async (req, res) => {
        const { project } = req.params;
        try {
            const brandIdentity = await BrandIdentity.find({project});
            res.status(200).json({
                message: 'Brand Identity found',
                brandIdentity,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}