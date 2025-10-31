const express = require('express');
const router = express.Router();
const levelController = require('../controllers/level.controller');

router.get('/:projectId', levelController.getLevels);
router.put('/:levelId', levelController.updateLevelStatus);

module.exports = router;