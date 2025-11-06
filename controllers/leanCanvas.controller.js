const LeanCanvas = require('../models/LeanCanvas');

// controller/getLeanCanvas.js
exports.getLeanCanvas = async (req, res) => {
  try {
    const { projectId } = req.params;

    let leanCanvas = await LeanCanvas.findOne({ project: projectId });

    if (!leanCanvas) {
      // Jika belum ada, bisa buat dari Business Idea
      const businessIdea = await BusinessIdea.findOne({ project: projectId });
      if (!businessIdea) {
        return res.status(404).json({ message: 'Lean Canvas dan Business Idea tidak ditemukan' });
      }

      // Mapping businessIdea ke LeanCanvas
      leanCanvas = {
        project: projectId,
        problem: businessIdea.problem || '',
        solution: businessIdea.solution || '',
        customerSegments: businessIdea.customerSegments || '',
        uniqueValueProposition: businessIdea.interest || '',
        unfairAdvantage: businessIdea.gainCreators || '',
        keyMetrics: businessIdea.keyMetrics || '',
        channels: businessIdea.channels || '',
        costStructure: businessIdea.costStructure || '',
        revenueStreams: businessIdea.revenueStreams || '',
      };
    }

    res.status(200).json(leanCanvas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// PUT /api/lean-canvas/project/:projectId
exports.updateLeanCanvasByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const {
      problem,
      solution,
      customerSegments,
      uniqueValueProposition,
      unfairAdvantage,
      keyMetrics,
      channels,
      costStructure,
      revenueStreams,
    } = req.body;

    const leanCanvas = await LeanCanvas.findOneAndUpdate(
      { project: projectId },
      {
        problem,
        solution,
        customerSegments,
        uniqueValueProposition,
        unfairAdvantage,
        keyMetrics,
        channels,
        costStructure,
        revenueStreams,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: 'Lean Canvas updated',  leanCanvas });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};