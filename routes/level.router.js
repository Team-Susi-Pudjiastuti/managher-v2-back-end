const express = require('express');
const router = express.Router();
const levelController = require('../controllers/level.controller');

router.post('/', levelController.createLevel);

module.exports = router;