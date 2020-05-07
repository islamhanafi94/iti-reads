const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { timestamps: true })