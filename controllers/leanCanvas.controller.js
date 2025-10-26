const LeanCanvas = require('../models/leanCanvas');

module.exports = {
    updateLeanCanvas: async (req, res) => {
        const { id } = req.params;
        const leanCanvas = await LeanCanvas.findByIdAndUpdate(id, req.body, { new: true });
        res.json(leanCanvas);
    },
    getLeanCanvas: async (req, res) => {
        const { project } = req.params;
        try {
            const leanCanvas = await LeanCanvas.find(project);
            res.status(200).json({
                message: 'Lean Canvas found',
                leanCanvas,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}