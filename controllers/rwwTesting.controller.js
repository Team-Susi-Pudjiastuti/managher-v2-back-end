const RWWTesting = require('../models/RWWTesting');

module.exports = {
    createRWWTesting: async (req, res) => {
        const { project, name, age, gender, activity, real, win, worth } = req.body;
        try {
            const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);
            const realScore = sum(real);
            const winScore = sum(win);
            const worthScore = sum(worth);
            const totalScore = realScore + winScore + worthScore;
            const rwwTesting = await RWWTesting.create({
                project,
                name,
                age,
                gender,
                activity,
                real,
                win,
                worth,
                totalScore
            });
            res.status(200).json({
                message: 'RWW Testing created',
                rwwTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateRWWTesting: async (req, res) => {
        const { id } = req.params;
        const { project, name, age, gender, activity, real, win, worth } = req.body;
        try {
            const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);
            const realScore = sum(real);
            const winScore = sum(win);
            const worthScore = sum(worth);
            const totalScore = realScore + winScore + worthScore;
            const rwwTesting = await RWWTesting.findByIdAndUpdate(id, {
                project,
                name,
                age,
                gender,
                activity,
                real,
                win,
                worth,
                totalScore
            }, { new: true });
            res.status(200).json({
                message: 'RWW Testing updated',
                rwwTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getRWWTesting: async (req, res) => {
        const { project } = req.params;
        try {
            const rwwTesting = await RWWTesting.find({ project });
            res.status(200).json({
                message: 'RWW Testing retrieved',
                rwwTesting,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAverage: async (req, res) => {
        const { project } = req.params;
        try {
            const rwwTestings = await RWWTesting.find({ project });
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
