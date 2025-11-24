// routes/brandIdentityRoutes.js
const express = require('express');
const brandIdentityController = require('../controllers/brandIdentity.controller');
const router = express.Router();
const upload = require('../utils/multer');

// ✅ HAPUS SLASH DI AKHIR SEMUA ROUTE
router.get('/:project', brandIdentityController.getBrandIdentity);
router.put('/:id', brandIdentityController.updateBrandIdentity);
router.put('/:id/logoPreview', upload.single('file'), brandIdentityController.updateBrandIdentityLogoPreview);

module.exports = router;