const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    phase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phase',
        required: false
    },
    order: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    xp: {
        type: Number,
        default: 10
    },
    icon: {
        type: String,
        required: false
    },
    badge: {
        type: String,
        required: false
    },
    entities: [{
        entity_type: {
            type: String,
            enum: ['business_idea', 'rww_testing', 'product_concept', 'brand_identity', 'lean_canvas', 'beta_testing', 'prototype', 'launch_product'],
            required: false
        },
        entity_ref: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'entities.entity_type'
        },
    }],
    completed: {
        type: Boolean,
        default: false
    },
    path: {
        type: String,
        required: false
    }   
}, { timestamps: true });

module.exports = mongoose.model('Level', LevelSchema);