const Phase = require('../models/Phase');

module.exports = {
    getPhases: async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const phases = await Phase.find({ project: projectId });
            res.status(200).json({
                data: phases,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updatePhaseStatus: async (req, res) => {
        try {
            const { phaseId } = req.params;
            const { completed } = req.body;

            const phase = await Phase.findByIdAndUpdate(
                phaseId, 
                { completed }, 
                { new: true }
            );
            res.status(200).json(
                { 
                    message: 'Phase updated', 
                    data: phase 
                }
            );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
