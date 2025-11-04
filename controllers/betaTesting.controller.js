// controllers/betaTesting.controller.js
const BetaTesting = require('../models/BetaTesting');

exports.createOrUpdateBetaTesting = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { responses } = req.body; // array responden

    let betaTesting = await BetaTesting.findOne({ project: projectId });

    if (betaTesting) {
      // Update
      betaTesting.responses = responses;
      await betaTesting.save();
    } else {
      // Create
      betaTesting = await BetaTesting.create({
        project: projectId,
        responses,
      });
    }

    res.status(200).json({
      message: 'Beta Testing updated',
      data: betaTesting.responses,
    });
  } catch (error) {
    console.error('Beta Testing error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getBetaTesting = async (req, res) => {
  try {
    const { projectId } = req.params;
    const betaTesting = await BetaTesting.findOne({ project: projectId });
    res.status(200).json({
      message: 'Beta Testing found',
      data: betaTesting ? betaTesting.responses : [],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};