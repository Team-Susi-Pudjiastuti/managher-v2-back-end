const Level = require('../models/level.model');

module.exports = {
    getLevels: async (req, res) => {
        try {
            const { projectId } = req.params;
            const levels = await Level.find({ project: projectId });
            res.status(200).json(
                { 
                    message: 'Levels retrieved', 
                    data: levels 
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateLevelStatus: async (req, res) => {
        try {
            const { levelId } = req.params;
            const { completed } = req.body;

            const level = await Level.findByIdAndUpdate(
                levelId, 
                { completed }, 
                { new: true }
            );
            res.status(200).json(
                { 
                    message: 'Level updated', 
                    data: level 
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
