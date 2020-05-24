const mongoose = require('mongoose');
const Book = require("./book");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Name must be unique'],
    },
    popularity: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

categorySchema.virtual('books', {
    ref: 'book',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.pre("deleteOne", {document: true}, function(next){

    Book.deleteMany({ category: this._id }).then(next);
    next();
});

const Category = mongoose.model('category', categorySchema);
module.exports = Category;
