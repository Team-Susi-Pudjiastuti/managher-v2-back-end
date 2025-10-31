const express = require('express');
const router = express.Router();
const phaseController = require('../controllers/phase.controller');

router.get('/:projectId', phaseController.getPhases);
router.put('/:phaseId', phaseController.updatePhaseStatus);

module.exports = router;