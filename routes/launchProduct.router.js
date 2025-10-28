const express = require('express');
const launchProductController = require('../controllers/launchProduct.controller');
const router = express.Router();

router.get('/:id', launchProductController.getLaunchProduct);
router.put('/:id', launchProductController.updateLaunchProduct);    

module.exports = router;