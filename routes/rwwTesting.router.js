const express = require('express');
const rwwTestingController = require('../controllers/rwwTesting.controller');
const router = express.Router();

router.post('/', rwwTestingController.createRWWTesting);
router.get('/:project', rwwTestingController.getRWWTesting);
router.put('/:id', rwwTestingController.updateRWWTesting);
router.get('/average/:project', rwwTestingController.getAverage);


module.exports = router;