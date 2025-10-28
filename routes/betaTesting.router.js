const express = require('express');
const betaTestingController = require('../controllers/betaTesting.controller');
const router = express.Router();

router.post('/', betaTestingController.createBetaTesting);
router.put('/:id', betaTestingController.updateBetaTesting);
router.get('/:project', betaTestingController.getBetaTesting);

module.exports = router;
