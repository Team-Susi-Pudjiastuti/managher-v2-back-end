const LeanCanvas = require('../models/LeanCanvas');
const BusinessIdea = require('../models/BusinessIdea');

// GET /api/lean-canvas/project/:projectId
exports.getLeanCanvasByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    let leanCanvas = await LeanCanvas.findOne({ project: projectId });

    if (leanCanvas) {
      return res.status(200).json({  leanCanvas });
    }

    // Jika belum ada, buat dari Business Idea
    const businessIdea = await BusinessIdea.findOne({ project: projectId });
    if (!businessIdea) {
      return res.status(404).json({ message: 'Business Idea not found' });
    }

    const initialData = {
      project: projectId,
      problem: businessIdea.problemSolved || '',
      solution: businessIdea.solutionOffered || '',
      customerSegments: businessIdea.marketPotential || '',
      uniqueValueProposition: businessIdea.uniqueValueProposition || '',
      unfairAdvantage: businessIdea.unfairAdvantage || '',
      keyMetrics: businessIdea.keyMetrics || '',
      channels: businessIdea.channel || '',
      costStructure: businessIdea.costStructure || '',
      revenueStreams: businessIdea.revenueStream || '',
    };

    res.status(200).json({ initialData, isFromBusinessIdea: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
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