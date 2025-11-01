const mongoose = require('mongoose');

const PrototypeSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false,
    },
    name: {
        type: String, 
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    // benefit: [{
    //     type: Array,
    //     required: false,
    // }],
    price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    unfairAdvantage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business_idea',
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('prototype', PrototypeSchema);