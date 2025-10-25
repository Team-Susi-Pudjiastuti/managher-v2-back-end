const RWWTesting = require('../models/RWWTesting');
const Responden = require('../models/Responden');

module.exports = {
    createRWWTesting: async (req, res) => {
        const { projectId, name, gender, activity, real, win, worth } = req.body;
        try {
            const rwwTesting = await RWWTesting.create({
                projectId,
                name,
                gender,
                activity,
                real,
                win,
                worth,
            });
            res.status(201).json({
                message: 'RWW Testing created',
                rwwTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getRWWTesting: async (req, res) => {
        const { projectId } = req.params;
        try {
            const rwwTestings = await RWWTesting.find({ projectId });
            res.status(200).json({
                message: 'RWW Testings retrieved',
                rwwTestings,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getAverage: async (req, res) => {
        const { projectId } = req.params;
        try {
            const rwwTestings = await RWWTesting.find({ projectId });
            const totalScore = rwwTestings.reduce((acc, cur) => acc + cur.totalScore, 0);
            const responden = rwwTestings.length
            const average = totalScore / responden;

            let status = '';
            if (average >= 25 && responden >= 5) {
                status = 'Kamu bisa mulai merancang produkmu';
            } else if (average >= 25 && responden < 5) {
                status = 'Cari responden lagi';
            } else if (average < 25){
                status = 'Perbaiki idemu';
            } else {
                status = 'failed';
            }
            
            res.status(200).json({
                message: 'Average score retrieved',
                average,
                responden,
                status,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    

};
