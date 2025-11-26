const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const upload = require('../utils/multer');

const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get("/me", userController.me);
router.post("/logout", userController.logout);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/change-password', userController.changePassword);
router.delete('/profile', userController.deleteProfile);
router.put('/avatar', upload.single('avatar'), userController.uploadAvatar);

module.exports = router;