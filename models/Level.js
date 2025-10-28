const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
    phase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phase',
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    entities: [{
        entity_type: {
            type: String,
            enum: ['business_idea', 'rww_testing', 'product_concept', 'brand_identity', 'lean_canvas', 'beta_testing', 'prototype', 'launch_product'],
            required: true
        },
        entity_ref: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'entities.entity_type'
        },
    }],
    status: {
        type: String,
        enum: ['locked', 'in_progress', 'completed'],
        default: 'locked'
    },
}, { timestamps: true });

module.exports = mongoose.model('Level', LevelSchema);