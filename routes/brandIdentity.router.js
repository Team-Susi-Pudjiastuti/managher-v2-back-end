const express = require('express');
const brandIdentityController = require('../controllers/brandIdentity.controller');
const router = express.Router();

router.post('/', brandIdentityController.createBrandIdentity);
router.get('/:project/', brandIdentityController.getBrandIdentity);
router.put('/:id/', brandIdentityController.updateBrandIdentity);

module.exports = router;