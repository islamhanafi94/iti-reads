const mongoose = require('mongoose');
const Book = require("./book");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }

}, { timestamps: true });


// categorySchema.post("remove", document => {
//     const categoryId = document._id;
//     Book.find({ category: { $in: categoryId } }).then(books => {
//       Promise.all(
//         books.map(book =>
//           Book.findOneAndUpdate(
//             book._id,
//             { $pull: { category: categoryId } },
//             { new: true }
//           )
//         )
//       );
//     });
//   });


categorySchema.post('deleteMany', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Book.remove({category_id: this._id}).exec();
    next();
});

const Category = mongoose.model('category', categorySchema);
module.exports = Category;
