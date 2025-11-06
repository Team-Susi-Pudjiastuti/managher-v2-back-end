const BusinessIdea = require('../models/BusinessIdea');

module.exports = {
    
    getBusinessIdeaByProject: async (req, res) => {
        try {
            const { projectId } = req.params;
            const businessIdea = await BusinessIdea.findOne({ project: projectId });
            if (!businessIdea) {
            return res.status(404).json({ message: 'Business Idea not found for this project' });
            }
            res.status(200).json({  businessIdea });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }, 
    
    getBusinessIdea: async (req, res) => {
        try {
            const id = req.params.id;
            const businessIdea = await BusinessIdea.findById(id);
            res.status(200).json(
                {
                    message: 'Business idea retrieved successfully',
                    data: businessIdea,
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateBusinessIdea: async (req, res) => {
        try {
            const id = req.params.id;
            const { interest, customerSegments, problem, solution, productsServices, painRelievers, gainCreators } = req.body;
            const businessIdea = await BusinessIdea.findByIdAndUpdate(id, {
                interest,
                customerSegments,
                problem,
                solution,
                productsServices,
                painRelievers,
                gainCreators
            }, { new: true });
            
            if (!businessIdea) {
                return res.status(404).json({ message: 'Business idea not found' });
            }
            res.status(200).json({
                message: 'Business idea updated successfully',
                data: businessIdea,
            });
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

