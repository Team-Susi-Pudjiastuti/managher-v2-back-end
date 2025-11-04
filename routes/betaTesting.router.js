// routes/betaTesting.routes.js
const express = require('express');
const betaTestingController = require('../controllers/betaTesting.controller');
const router = express.Router();

// Gunakan PUT untuk menyimpan array
router.get('/:projectId', betaTestingController.getBetaTesting);
router.put('/:projectId', betaTestingController.createOrUpdateBetaTesting);

module.exports = router;