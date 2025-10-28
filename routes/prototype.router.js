const express = require('express');
const prototypeController = require('../controllers/prototype.controller');
const router = express.Router();

router.post('/', prototypeController.createPrototype);
router.get('/:project', prototypeController.getPrototype);
router.put('/:id', prototypeController.updatePrototype);

module.exports = router;