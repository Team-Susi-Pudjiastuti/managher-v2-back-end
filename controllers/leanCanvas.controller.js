const LeanCanvas = require('../models/LeanCanvas');
const BusinessIdea = require('../models/BusinessIdea');
// controllers/leanCanvasController.js

// 💡 Fungsi mapping dari BusinessIdea → LeanCanvas
function mapIdeaToLeanCanvas(idea, projectId) {
  const product = idea.productsServices?.[0] || {};
  return {
    project: projectId,
    problem: idea.problem || '',
    solution: `${idea.solution || ''}\n\n${product.deskripsi || ''}`,
    customerSegments: idea.customerSegments || '',
    uniqueValueProposition: `${idea.interest?.toUpperCase() || ''} — ${product.keunggulan_unik || ''}`,
    unfairAdvantage: idea.gainCreators || '',
    keyMetrics: product.angka_penting || '',
    channels: product.cara_jualan || '',
    costStructure: `${product.biaya_modal || ''}\n${product.biaya_bahan_baku || ''}`,
    revenueStreams: product.harga || product.harga_jual || '',
  };
}

// 🚀 Endpoint untuk ambil Lean Canvas berdasarkan project
exports.getLeanCanvasByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    let leanCanvas = await LeanCanvas.findOne({ project: projectId });

    if (leanCanvas) {
      return res.status(200).json({ leanCanvas });
    }

    // Jika belum ada LeanCanvas → ambil dari BusinessIdea
    const businessIdea = await BusinessIdea.findOne({ project: projectId });
    if (!businessIdea) {
      return res.status(404).json({ message: 'Business Idea not found' });
    }

    // Gunakan fungsi mapping di sini
    const initialData = mapIdeaToLeanCanvas(businessIdea, projectId);

    res.status(200).json({ initialData, isFromBusinessIdea: true });
  } catch (error) {
    console.error(error);
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