const express = require('express');
const router = express.Router();
const businessIdeaController = require('../controllers/businessIdea.controller');

router.post('/', businessIdeaController.createBusinessIdea);
router.get('/:projectId', businessIdeaController.getAllBusinessIdeas);
router.put('/:id', businessIdeaController.updateBusinessIdea);

module.exports = router;






