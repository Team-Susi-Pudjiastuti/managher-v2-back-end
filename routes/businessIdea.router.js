const express = require('express');
const router = express.Router();
const businessIdeaController = require('../controllers/businessIdea.controller');

// router.get('/', businessIdeaController.getAllBusinessIdeas);
router.get('/:id', businessIdeaController.getBusinessIdea);
router.put('/:id', businessIdeaController.updateBusinessIdea);
router.get('/project/:projectId', businessIdeaController.getBusinessIdeaByProject);

module.exports = router;






