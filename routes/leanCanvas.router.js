const express = require('express');
const router = express.Router();
const leanCanvasController = require('../controllers/leanCanvas.controller');

router.get('/:projectId', leanCanvasController.getLeanCanvas);
router.put('/:projectId', leanCanvasController.updateLeanCanvasByProject);

module.exports = router;