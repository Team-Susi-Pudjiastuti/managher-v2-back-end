const mongoose = require('mongoose');

const RWWTestingSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },

    // Data Responden
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Laki-laki', 'Perempuan', 'Tidak mau memberi tau'],
        required: true,
    },
    // ubah sesuai kebutuhan
    activity: {
        type: String,
        enum: ['Mahasiswa', 'Ibu rumah tangga', 'Pekerja', 'Lainnya', 'Tidak mau memberi tau'],
        required: true,
    },

    // Data Testing
    real: [{ type: Number, min: 1, max: 5 }],
    win: [{ type: Number, min: 1, max: 5 }],
    worth: [{ type: Number, min: 1, max: 5 }],
    totalScore: {
        type: Number,
        default: 0
    }
    // status: {
    //     type: String,
    //     enum: ['not_started', 'try_again', 'passed'],
    //     default: 'not_started'
    // }
}, { timestamps: true });

RWWTestingSchema.pre('save', function (next) {
    const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);

    const realScore = sum(this.real);
    const winScore = sum(this.win);
    const worthScore = sum(this.worth);

    this.totalScore = realScore + winScore + worthScore;

    next();
});

module.exports = mongoose.model('rww_testing', RWWTestingSchema);
