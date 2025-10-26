const ProductConcept = require('../models/ProductConcept');

module.exports = {
    createProductConcept: async (req, res) => {
        const { project, logo, name, tagline, description, vision, mission, color } = req.body;
        const productConcept = new ProductConcept({
            project,
            logo,
            name,
            description,
            features,
            benefit,
            price
        });
        await productConcept.save();
        res.status(201).json(productConcept);
    },

    updateProductConcept: async (req, res) => {
        const { id } = req.params;
        const { project, logo, name, tagline, description, vision, mission, color } = req.body;
        try {
            const productConcept = await ProductConcept.findByIdAndUpdate(id, {
                project,
                logo,
                name,
                description,
                features,
                benefit,
                price
            }, { new: true });
            res.status(200).json({
                message: 'Product Concept updated',
                productConcept,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getProductConcept: async (req, res) => {
        const { project } = req.params;
        try {
            const productConcept = await ProductConcept.find(project);
            res.status(200).json({
                message: 'Product Concept found',
                productConcept,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}
