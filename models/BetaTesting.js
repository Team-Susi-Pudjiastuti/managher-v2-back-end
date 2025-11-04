// models/BetaTesting.js
const mongoose = require('mongoose');

const BetaTestingSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  // ✅ Simpan array responden
  responses: [{
    name: String,
    age: Number,
    gender: { type: String, enum: ['Laki-laki', 'Perempuan', 'Lainnya'] },
    activity: { type: String, enum: ['Mahasiswa', 'Ibu rumah tangga', 'Pekerja', 'Lainnya'] },
    scale: { type: Number, min: 1, max: 5 },
    comment: String,
    suggestion: String,           // tambahkan jika perlu
    recommendation: String,      // tambahkan jika perlu
  }],
}, { timestamps: true });

module.exports = mongoose.model('BetaTesting', BetaTestingSchema);