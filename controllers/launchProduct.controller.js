const LaunchProduct = require('../models/LaunchProduct');

module.exports = {
    getLaunchProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const launchProduct = await LaunchProduct.findById(id).
            populate( [
                    { path: 'productConcept' },
                    { path: 'brand_name', select: 'name' },
                    { path: 'brand_tagline', select: 'tagline' },
                    { path: 'launch_channel', select: 'channel' },
                ]
            );
            if (!launchProduct) {
                return res.status(404).json({ message: 'Launch Product not found' });
            }
            res.status(200).json({
                message: 'Launch Product found',
                launchProduct,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateLaunchProduct: async (req, res) => {
        const { id } = req.params;
        const { launch_date, productConcept, brand_name, brand_tagline, launch_channel } = req.body;
        try {
            const launchProduct = await LaunchProduct.findByIdAndUpdate(id, {
                launch_date,
                productConcept,
                brand_name,
                brand_tagline,
                launch_channel,
            }, { new: true });
            res.status(200).json({
                message: 'Launch Product updated',
                launchProduct,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}