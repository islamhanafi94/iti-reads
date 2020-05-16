const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("review", reviewsSchema);
module.exports = Review;
