const mongoose = require('mongoose');

const BetaTestingSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    prototypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prototype',
        required: false,
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
    scale: {
        type: Number,
        min: 1,
        max: 5,
        required: false,
    },
    comment: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('beta_testing', BetaTestingSchema);