const RWWTesting = require('../models/RWWTesting');

module.exports = {
    createRWWTesting: async (req, res) => {
        try {
            const { project, name, age, gender, activity, real, win, worth } = req.body;
            const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);
            const realScore = sum(real);
            const winScore = sum(win);
            const worthScore = sum(worth);
            const totalScore = (realScore + winScore + worthScore);
            const rwwTesting = await RWWTesting.create({
                project,
                name,
                age,
                gender,
                activity,
                real,
                win,
                worth
            });
            res.status(200).json({
                message: 'RWW Testing created',
                data:rwwTesting,
                realScore: realScore/3,
                winScore: winScore/3,
                worthScore: worthScore/3,
                totalScore: totalScore/3
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateRWWTesting: async (req, res) => {
        try {
            const { id } = req.params;
            const { project, name, age, gender, activity, real, win, worth } = req.body;
            const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);
            const realScore = sum(real)/3;
            const winScore = sum(win)/3;
            const worthScore = sum(worth)/3;
            const total = (realScore + winScore + worthScore)/3;
            const totalScore = total.toFixed(2);
            const rwwTesting = await RWWTesting.findByIdAndUpdate(id, {
                project,
                name,
                age,
                gender,
                activity,
                real,
                win,
                worth,
            }, { new: true });
            res.status(200).json({
                message: 'RWW Testing updated',
                data: rwwTesting,
                realScore: realScore.toFixed(2),
                winScore: winScore.toFixed(2),
                worthScore: worthScore.toFixed(2),
                totalScore,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getRWWTesting: async (req, res) => {
        try {
            const { project } = req.params;
            const rwwTesting = await RWWTesting.find({ project });
            res.status(200).json({
                message: 'RWW Testing retrieved',
                data: rwwTesting,
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
            if (average >= 3.5 && responden >= 5) {
                status = 'Kamu bisa mulai merancang produkmu';
            } else if (average >= 3.5 && responden < 5) {
                status = 'Cari responden lagi';
            } else if (average < 3.5){
                status = 'Perbaiki idemu';
            } else {
                status = 'failed';
            }
            
            res.status(200).json({
                message: 'Average score retrieved',
                average: average.toFixed(2),
                responden,
                status,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    

};
