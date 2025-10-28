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
    name: {
        type: String, 
        required: false,
    },
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