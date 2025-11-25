// controllers/brandIdentityController.js
const BrandIdentity = require('../models/BrandIdentity');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

module.exports = {
  getBrandIdentity: async (req, res) => {
    try {
      const { project } = req.params;
      if (!project) {
        return res.status(400).json({ message: 'Project ID is required' });
      }

      const brandIdentity = await BrandIdentity.findOne({ project });
      if (!brandIdentity) {
        return res.status(404).json({ message: 'Brand Identity not found' });
      }

      res.status(200).json({
        message: 'Brand Identity found',
         brandIdentity,
      });
    } catch (error) {
      console.error('Error in getBrandIdentity:', error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  },

  updateBrandIdentity: async (req, res) => {
    try {
      const { id } = req.params;
      const { brandName, tagline, palette } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Brand Identity ID is required' });
      }

      const brandIdentity = await BrandIdentity.findByIdAndUpdate(
        id,
        { brandName, tagline, palette },
        { new: true, runValidators: true }
      );

      if (!brandIdentity) {
        return res.status(404).json({ message: 'Brand Identity not found' });
      }

      res.status(200).json({
        message: 'Brand Identity updated',
         brandIdentity,
      });
    } catch (error) {
      console.error('Error in updateBrandIdentity:', error);
      res.status(400).json({ message: error.message || 'Update failed' });
    }
  },

  // ✅ PERBAIKAN UTAMA: upload logo
  updateBrandIdentityLogoPreview: async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ Validasi file diterima
      if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded. Please select a valid image (JPG, PNG, GIF).' });
      }

      // ✅ Upload ke Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'brandIdentity',
      });

      // ✅ Update database
      const brandIdentity = await BrandIdentity.findByIdAndUpdate(
        id,
        { logoPreview: result.secure_url },
        { new: true }
      );

      if (!brandIdentity) {
        return res.status(404).json({ message: 'Brand Identity not found' });
      }

      // ✅ Hapus file sementara dari disk
      fs.unlinkSync(req.file.path);

      // ✅ Respons sukses
      res.status(200).json({
        message: 'Logo uploaded successfully',
         brandIdentity,
      });
    } catch (err) {
      console.error('🔥 Logo upload error:', err);

      // ✅ Hapus file sementara jika ada error
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({ message: err.message || 'Failed to upload logo' });
    }
  },
};