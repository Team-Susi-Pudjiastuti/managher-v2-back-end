// controllers/launchProduct.controller.js
const LaunchProduct = require('../models/LaunchProduct');

exports.getLaunchProduct = async (req, res) => {
  const { projectId } = req.params; // ganti jadi projectId untuk kejelasan
  try {
    const launchProduct = await LaunchProduct.findOne({ project: projectId });
    res.status(200).json({
      message: 'Launch Product found',
      data: launchProduct ? launchProduct.checklist : {
        social: false,
        photos: false,
        payment: false,
        offer: false,
        delivery: false,
        price: false,
        feedback: false,
        schedule: false,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateLaunchProduct = async (req, res) => {
  const { projectId } = req.params;
  const { checklist } = req.body;

  try {
    let launchProduct = await LaunchProduct.findOne({ project: projectId });
    if (launchProduct) {
      launchProduct.checklist = checklist;
      await launchProduct.save();
    } else {
      launchProduct = await LaunchProduct.create({
        project: projectId,
        checklist,
      });
    }

    res.status(200).json({
      message: 'Launch Product updated',
      data: launchProduct.checklist,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ message: error.message });
  }
};