const mongoose = require('mongoose');

const RWWTestingSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },

    // Data Responden
    name: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        enum: ['Laki-laki', 'Perempuan', 'Tidak mau memberi tau'],
        required: false,
    },
    // ubah sesuai kebutuhan
    activity: {
        type: String,
        enum: ['Mahasiswa', 'Ibu rumah tangga', 'Pekerja', 'Lainnya', 'Tidak mau memberi tau'],
        required: false,
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

module.exports = mongoose.model('rww_testing', RWWTestingSchema);
