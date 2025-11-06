const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  jenis: { type: String, trim: true },
  deskripsi: { type: String, trim: true },
  fitur_utama: { type: String, trim: true },
  manfaat: { type: String, trim: true },
  harga: { type: String, trim: true },
  biaya_modal: { type: String, trim: true },
  biaya_bahan_baku: { type: String, trim: true },
  harga_jual: { type: String, trim: true },
  margin: { type: String, trim: true },
  keunggulan_unik: { type: String, trim: true },
  angka_penting: { type: String, trim: true },
  cara_jualan: { type: String, trim: true },
});

const BusinessIdeaSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },

  // Tahap ideasi
  interest: { type: String, trim: true }, // contoh: “Edukasi Anak”
  customerSegments: { type: String, trim: true }, // siapa targetnya
  problem: { type: String, trim: true }, // masalah utama pelanggan
  solution: { type: String, trim: true }, // solusi inti

  // Solusi & produk yang ditawarkan
  productsServices: [ProductSchema], // array of produk/layanan

  // Nilai tambahan
  painRelievers: { type: String, trim: true },
  gainCreators: { type: String, trim: true },

  // Metadata sistem
  generatedIdeas: { type: [Object], default: [] },
}, {
  timestamps: true,
});

module.exports = mongoose.model('business_idea', BusinessIdeaSchema);
