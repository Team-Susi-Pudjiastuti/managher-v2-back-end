const express = require('express');
const prototypeController = require('../controllers/prototype.controller');
const router = express.Router();

// routes/prototype.routes.js
// Ganti dari `/:project` → `/project/:projectId`
router.get('/:projectId', prototypeController.getPrototype);
router.put('/:projectId', prototypeController.updatePrototype);

module.exports = router;