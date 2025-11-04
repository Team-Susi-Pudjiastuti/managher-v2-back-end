// routes/launchProduct.routes.js
const express = require('express');
const launchProductController = require('../controllers/launchProduct.controller');
const router = express.Router();

router.get('/:projectId', launchProductController.getLaunchProduct);
router.put('/:projectId', launchProductController.updateLaunchProduct);

module.exports = router;