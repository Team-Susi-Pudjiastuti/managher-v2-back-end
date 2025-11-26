// controllers/prototypeController.js
const Prototype = require('../models/Prototype');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.getPrototype = async (req, res) => {
  try {
    const { projectId } = req.params;
    const prototype = await Prototype.findOne({ project: projectId });
    res.status(200).json({
      message: 'Prototype found',
      data: prototype ? prototype.products : [],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePrototype = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: 'Products must be an array' });
    }

    let prototype = await Prototype.findOne({ project: projectId });
    if (prototype) {
      prototype.products = products;
      await prototype.save();
    } else {
      prototype = await Prototype.create({
        project: projectId,
        products,
      });
    }

    res.status(200).json({
      message: 'Prototype updated',
      data: prototype.products,
    });
  } catch (error) {
    console.error('Update prototype error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // upload ke Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'prototype',
    });

    // hapus file lokal
    fs.unlink(req.file.path, () => {});

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
