const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
// router.get('/profile', userController.getProfile);
// router.put('/profile', userController.updateProfile);
// router.delete('/profile', userController.deleteProfile);

router.get("/me", (req, res) => {
  const token = req.cookies.token; // ambil dari cookie
  if (!token) return res.json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      user: { id: decoded.id, username: decoded.username },
    });
  } catch (e) {
    res.clearCookie("token");
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

module.exports = router;