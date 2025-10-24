const express = require('express');
const router = express.Router();
const businessIdeaController = require('../controllers/businessIdea.controller');

router.post('/', businessIdeaController.createBusinessIdea);
router.get('/', businessIdeaController.getAllBusinessIdeas);
router.get('/:id', businessIdeaController.getBusinessIdeaById);
router.put('/:id', businessIdeaController.updateBusinessIdea);
router.delete('/:id', businessIdeaController.deleteBusinessIdea);

module.exports = router;






