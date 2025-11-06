// models/LaunchProduct.js
const mongoose = require('mongoose');

const LaunchProductSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  checklist: {
    social: { type: Boolean, default: false },
    photos: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    offer: { type: Boolean, default: false },
    delivery: { type: Boolean, default: false },
    price: { type: Boolean, default: false },
    feedback: { type: Boolean, default: false },
    schedule: { type: Boolean, default: false },
  }
}, { timestamps: true });

module.exports = mongoose.model('launch_product', LaunchProductSchema);