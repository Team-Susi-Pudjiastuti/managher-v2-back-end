const Prototype = require('../models/Prototype');

module.exports = {
    createPrototype: async (req, res) => {
        try {
            const { project, name, description, feature, price, unfairAdvantage, image } = req.body;
            const prototype = await Prototype.create({
                project,
                name,
                description,
                feature,
                price,
                unfairAdvantage,
                image,
            });
            res.status(201).json({
                message: 'Prototype created',
                data: prototype,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updatePrototype: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, image } = req.body;
            const prototype = await Prototype.findByIdAndUpdate(id, {
                name,
                description,
                image,
            }, { new: true });
            res.status(200).json({
                message: 'Prototype updated',
                data: prototype,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getPrototype: async (req, res) => {
        try {
            const { project } = req.params;
            const prototype = await Prototype.find({ project }).
            populate([
                { path: 'price', select: 'revenueStream' },
                { path: 'feature', select: 'features' },
                { path: 'unfairAdvantage', select: 'unfairAdvantage' },
            ]);
            if (!prototype) {
                return res.status(404).json({ message: 'Prototype not found' });
            }
            res.status(200).json({
                message: 'Prototype found',
                prototype,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}