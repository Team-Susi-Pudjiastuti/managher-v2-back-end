const express = require('express');
const prototypeController = require('../controllers/prototype.controller');
const router = express.Router();
const upload = require('../utils/multer');

// routes/prototype.routes.js
// Ganti dari `/:project` → `/project/:projectId`
router.get('/:projectId', prototypeController.getPrototype);
router.put('/:projectId', prototypeController.updatePrototype);
router.patch('/:projectId/upload', upload.single('file'), prototypeController.uploadImage);


module.exports = router;