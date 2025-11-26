// models/Prototype.js
const mongoose = require('mongoose');

const PrototypeSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  products: [{
    id: { type: String, required: true },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    image: { type: String, default: '' },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Prototype', PrototypeSchema);