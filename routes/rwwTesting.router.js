const express = require('express');
const rwwTestingController = require('../controllers/rwwTesting.controller');
const router = express.Router();

router.post('/', rwwTestingController.createRWWTesting);
router.get('/:projectId', rwwTestingController.getRWWTesting);
router.get('/average/:projectId', rwwTestingController.getAverage);


module.exports = router;