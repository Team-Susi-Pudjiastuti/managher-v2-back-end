const express = require('express');
const leanCanvasController = require('../controllers/leanCanvas.controller');
const router = express.Router();

router.put('/:id', leanCanvasController.updateLeanCanvas);
router.get('/:id', leanCanvasController.getLeanCanvas);

module.exports = router;
