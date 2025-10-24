const express = require('express');
const router = express.Router();
const phaseController = require('../controllers/phase.controller');

router.post('/', phaseController.createPhase);

module.exports = router;