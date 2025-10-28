const Prototype = require('../models/Prototype');

module.exports = {
    createPrototype: async (req, res) => {
        const { project, productConcept, image } = req.body;
        try {
            const prototype = await Prototype.create({
                project,
                productConcept,
                image,
            });
            res.status(201).json({
                message: 'Prototype created',
                prototype,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updatePrototype: async (req, res) => {
        const { id } = req.params;
        const { image } = req.body;
        try {
            const prototype = await Prototype.findByIdAndUpdate(id, {
                image,
            }, { new: true });
            res.status(200).json({
                message: 'Prototype updated',
                prototype,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getPrototype: async (req, res) => {
        const { project } = req.params;
        try {
            const prototype = await Prototype.find({ project }).
            populate('productConcept');
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