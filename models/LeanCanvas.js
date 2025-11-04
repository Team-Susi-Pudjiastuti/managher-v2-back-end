const mongoose = require('mongoose');

const leanCanvasSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    unique: true,
  },
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  customerSegments: { type: String, default: '' },
  uniqueValueProposition: { type: String, default: '' },
  unfairAdvantage: { type: String, default: '' },
  keyMetrics: { type: String, default: '' },
  channels: { type: String, default: '' },
  costStructure: { type: String, default: '' },
  revenueStreams: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('LeanCanvas', leanCanvasSchema);