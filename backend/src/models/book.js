const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, 'Name must be unique'],
            // required: true,
        },
        image: { type: String },
        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            required: true,
        },
        popularity: {
            type: Number,
            default: 0,
        },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    },
    { timestamps: true }
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
