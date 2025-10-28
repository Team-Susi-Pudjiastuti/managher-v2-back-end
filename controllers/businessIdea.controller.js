const BusinessIdea = require('../models/BusinessIdea');

module.exports = {
    getBusinessIdea: async (req, res) => {
        const id = req.params.id;
        try {
            const businessIdea = await BusinessIdea.findById(id);
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
        const id = req.params.id;
        const { idea, description, category, problemSolved, solutionOffered, marketPotential, uniqueValueProposition } = req.body;
        try {
            const businessIdea = await BusinessIdea.findByIdAndUpdate(id, {
                idea,
                description,
                category,
                problemSolved,
                solutionOffered,
                marketPotential,
                uniqueValueProposition,
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

