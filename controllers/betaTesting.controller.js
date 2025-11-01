const BetaTesting = require('../models/BetaTesting');

module.exports = {
    createBetaTesting: async (req, res) => {
        try {
            const { project, prototypeId, name, scale, comment } = req.body;
            const betaTesting = await BetaTesting.create({
                project,
                prototypeId,
                name,
                scale,
                comment,
            });
            res.status(201).json({
                message: 'Beta Testing created',
                data: betaTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateBetaTesting: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, scale, comment } = req.body;
            const betaTesting = await BetaTesting.findByIdAndUpdate(id, {
                name,
                scale,
                comment,    
            }, { new: true });
            res.status(200).json({
                message: 'Beta Testing updated',
                data: betaTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getBetaTesting: async (req, res) => {
        const { project } = req.params;
        try {
            const betaTesting = await BetaTesting.find({ project });
            res.status(200).json({
                message: 'Beta Testing found',
                data: betaTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}