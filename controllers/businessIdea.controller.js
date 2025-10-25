const BusinessIdea = require('../models/BusinessIdea');

module.exports = {
    createBusinessIdea: async (req, res) => {
        const { projectId, idea, description, category, problemSolved, solutionOffered, marketPotential } = req.body;
        try {
            const businessIdea = await BusinessIdea.create({
                projectId,
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
        const projectId = req.params.projectId;
        try {
            const businessIdeas = await BusinessIdea.findOne({ projectId: projectId });
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

    updateBusinessIdea: async (req, res) => {
        const id = req.params.id;
        const { idea, description, category, problemSolved, solutionOffered, marketPotential } = req.body;
        try {
            const businessIdea = await BusinessIdea.findByIdAndUpdate(id, {
                idea,
                description,
                category,
                problemSolved,
                solutionOffered,
                marketPotential,
            }, { new: true });
            
            if (!businessIdea) {
                return res.status(404).json({ message: 'Business idea not found' });
            }
            res.status(200).json(businessIdea);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // deleteBusinessIdea: async (req, res) => {
    //     try {
    //         const businessIdea = await BusinessIdea.findByIdAndDelete(req.params.id);
    //         if (!businessIdea) {
    //             return res.status(404).json({ message: 'Business idea not found' });
    //         }
    //         res.status(200).json(
    //             {
    //                 message: 'Business idea deleted successfully',
    //                 businessIdea,
    //             }
    //         );
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // },
}

