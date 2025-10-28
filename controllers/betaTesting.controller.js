const BetaTesting = require('../models/BetaTesting');

module.exports = {
    createBetaTesting: async (req, res) => {
        const { project, prototypeId, name, scale, comment } = req.body;
        try {
            const betaTesting = await BetaTesting.create({
                project,
                prototypeId,
                name,
                scale,
                comment,
            });
            res.status(201).json(betaTesting);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateBetaTesting: async (req, res) => {
        const { id } = req.params;
        const { prototype, name, scale, comment } = req.body;
        try {
            const betaTesting = await BetaTesting.findByIdAndUpdate(id, {
                prototype,
                name,
                scale,
                comment,    
            }, { new: true });
            res.status(200).json({
                message: 'Beta Testing updated',
                betaTesting,
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
                betaTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}