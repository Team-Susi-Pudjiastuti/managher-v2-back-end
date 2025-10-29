const LeanCanvas = require('../models/LeanCanvas');

module.exports = {
    updateLeanCanvas: async (req, res) => {
        const { id } = req.params;
        const { problem, customerSegment, uniqueValuePropotionId, solution, unfairAdvantage, keyMetrics, revenueStreams, costStructure, channels } = req.body;
        const leanCanvas = await LeanCanvas.findByIdAndUpdate(id, {
            problem,
            customerSegment,
            uniqueValuePropotionId,
            solution,
            unfairAdvantage,
            keyMetrics,
            revenueStreams,
            costStructure,
            channels,
        }, { new: true });
        res.json(leanCanvas);
    },

    getLeanCanvas: async (req, res) => {
        const { id } = req.params;
        try {
            const leanCanvas = await LeanCanvas.findById(id).
            populate( [
                    { path: 'problem', select: 'problemSolved' },
                    { path: 'customerSegment', select: 'marketPotential' },
                    { path: 'uniqueValuePropositionId', select: 'uniqueValueProposition' },
                    { path: 'solution', select: 'name' },
                    { path: 'unfairAdvantage', select: 'unfairAdvantage' },
                ]
            );
            res.status(200).json({
                message: 'Lean Canvas found',
                leanCanvas,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}