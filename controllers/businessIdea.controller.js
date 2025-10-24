const BusinessIdea = require('../models/BusinessIdea');

module.exports = {
    createBusinessIdea: async (req, res) => {
        const { idea, description, category, problemSolved, solutionOffered, marketPotential } = req.body;
        try {
            const businessIdea = await BusinessIdea.create({
                idea,
                description,
                category,
                problemSolved,
                solutionOffered,
                marketPotential,
            });

            res.status(201).json(
                {
                    message: 'Business idea created successfully',
                    businessIdea,
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllBusinessIdeas: async (req, res) => {
        try {
            const businessIdeas = await BusinessIdea.find();
            res.status(200).json(
                {
                    message: 'Business ideas retrieved successfully',
                    businessIdeas,
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getBusinessIdeaById: async (req, res) => {
        try {
            const businessIdea = await BusinessIdea.findById(req.params.id);
            if (!businessIdea) {
                return res.status(404).json({ message: 'Business idea not found' });
            }
            res.status(200).json(
                {
                    message: 'Business idea retrieved successfully',
                    businessIdea,
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateBusinessIdea: async (req, res) => {
        try {
            const businessIdea = await BusinessIdea.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!businessIdea) {
                return res.status(404).json({ message: 'Business idea not found' });
            }
            res.status(200).json(businessIdea);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteBusinessIdea: async (req, res) => {
        try {
            const businessIdea = await BusinessIdea.findByIdAndDelete(req.params.id);
            if (!businessIdea) {
                return res.status(404).json({ message: 'Business idea not found' });
            }
            res.status(200).json(
                {
                    message: 'Business idea deleted successfully',
                    businessIdea,
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}

