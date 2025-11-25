// utils/multer.js
const multer = require('multer');
const path = require('path');

// Pastikan folder 'uploads' ada di root project
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
    cb(new Error('Only JPG, JPEG, PNG, and GIF files are allowed'), false);
    return;
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });