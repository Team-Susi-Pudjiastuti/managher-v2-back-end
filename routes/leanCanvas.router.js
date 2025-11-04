const express = require('express');
const router = express.Router();
const leanCanvasController = require('../controllers/leanCanvas.controller');

router.get('/project/:projectId', leanCanvasController.getLeanCanvasByProject);
router.put('/project/:projectId', leanCanvasController.updateLeanCanvasByProject);

module.exports = router;