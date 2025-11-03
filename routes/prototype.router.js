const express = require('express');
const prototypeController = require('../controllers/prototype.controller');
const router = express.Router();

router.post('/', prototypeController.createPrototype);
router.get('/:project', prototypeController.getPrototype);
router.put('/:project', prototypeController.updatePrototype);

module.exports = router;