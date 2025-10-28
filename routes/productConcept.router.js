const express = require('express');
const productConceptController = require('../controllers/productConcept.controller');
const router = express.Router();

router.post('/', productConceptController.createProductConcept);
router.get('/:project/', productConceptController.getProductConcept);
router.put('/:id/', productConceptController.updateProductConcept);

module.exports = router;