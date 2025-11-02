const LaunchProduct = require('../models/LaunchProduct');

module.exports = {
    getLaunchProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const launchProduct = await LaunchProduct.findById(id).
            populate('levels');
            if (!launchProduct) {
                return res.status(404).json({ message: 'Launch Product not found' });
            }
            res.status(200).json({
                message: 'Launch Product found',
                data: launchProduct,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateLaunchProduct: async (req, res) => {
        const { id } = req.params;
        const { checklist } = req.body;
        try {
            const launchProduct = await LaunchProduct.findByIdAndUpdate(id, {
                checklist,
            }, { new: true });
            res.status(200).json({
                message: 'Launch Product updated',
                data: launchProduct,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}