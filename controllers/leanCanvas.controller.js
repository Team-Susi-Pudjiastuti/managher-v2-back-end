const LeanCanvas = require('../models/LeanCanvas');

module.exports = {
    updateLeanCanvas: async (req, res) => {
        try {
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
            res.status(200).json({
                message: 'Lean Canvas updated',
                data: leanCanvas,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getLeanCanvas: async (req, res) => {
        try {
            const { id } = req.params;
            const leanCanvas = await LeanCanvas.findById(id).
            populate( [
                    { path: 'problem', select: 'problemSolved' },
                    { path: 'customerSegment', select: 'marketPotential' },
                    { path: 'uniqueValuePropositionId', select: 'uniqueValueProposition' },
                    { path: 'solution', select: 'solutionOffered' },
                    { path: 'unfairAdvantage', select: 'unfairAdvantage' },
                    { path: 'keyMetrics', select: 'keyMetrics' },
                    { path: 'revenueStreams', select: 'revenueStream' },
                    { path: 'costStructure', select: 'costStructure' },
                    { path: 'channels', select: 'channel' },
                ]
            );
            res.status(200).json({
                message: 'Lean Canvas found',
                data: leanCanvas,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}