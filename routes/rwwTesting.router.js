const express = require('express');
const rwwTestingController = require('../controllers/rwwTesting.controller');
const router = express.Router();

router.get('/:project', rwwTestingController.getRWWTesting);
router.patch('/:project', rwwTestingController.createRWWTesting);
// router.get('/average/:project', rwwTestingController.getAverage);


module.exports = router;