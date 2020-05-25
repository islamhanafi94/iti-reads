const Review = require("../models/review");
const Book = require("../models/book");
const { response } = require('../middlewares');

const reviewController = {};


reviewController.addReview = async (req, res) => {

    try {
        const { review, user } = req.body;
        const newReview = await Review.create({ review, user });
        const book = await Book.findById(req.params.bookId);
        book.reviews.push(newReview._id);
        await book.save();
        return res.send(newReview);
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
}


reviewController.deleteReview = async (req, res) => {
    try {

        const { reviewId } = req.body;
        const book = await Book.findById(req.params.bookId);

        book.reviews = book.reviews.filter((review) => {
            return review != reviewId;
        });
        await book.save();
        const deletedreview = await Review.findByIdAndDelete(reviewId);
        return res.send(deletedreview);
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
}


module.exports = reviewController;