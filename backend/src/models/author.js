const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        photo: {
            type: String,
        },
       
    },
    { timestamps: true }
);

authorSchema.pre("deleteOne", {document: true}, function(next){

    Book.deleteMany({ author: this._id }).then(next);
    next();
});

const Author = mongoose.model("author", authorSchema);
module.exports = Author;
