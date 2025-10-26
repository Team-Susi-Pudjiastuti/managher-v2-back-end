const express = require('express');
const leanCanvasController = require('../controllers/leanCanvas.controller');
const router = express.Router();

router.put('/:id', leanCanvasController.updateLeanCanvas);
router.get('/:project', leanCanvasController.getLeanCanvas);

module.exports = router;
