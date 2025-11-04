const express = require('express');
const prototypeController = require('../controllers/prototype.controller');
const router = express.Router();

// routes/prototype.routes.js
// Ganti dari `/:project` → `/project/:projectId`
router.get('/project/:projectId', prototypeController.getPrototype);
router.put('/project/:projectId', prototypeController.updatePrototype);

module.exports = router;