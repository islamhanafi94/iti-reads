const Book = require("../models/book");
const author = require("../models/author");
const category = require("../models/category");
const review = require("../models/review");
const { response } = require("../middlewares");

const bookController = {};

// const bookController = require('../controllers/book.controller');

//get popular books
bookController.getPopularBooks = (req, res) => {
    console.log("in function");

    // Retrieve books sorted by popularity and limited to 3 //desc
    Book.find({}, null, { sort: { popularity: -1 }, limit: 3 })
        .populate("author")
        .populate("category")
        .then((books) => {
            console.log("====================================");
            console.log(books);
            console.log("====================================");
            res.status(200).json({ data: books });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ err: err });
        });
};
// Get all books
bookController.getAllBooks = async (req, res, next) => {
    const allBooks = await Book.find({})
        .populate("author")
        .populate("category")
        .populate("reviews")
        .exec((err, data) => {
            if (err) {
                return res.send(err);
            }
            res.json(data);
        });
};

// Get specific book
bookController.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate("author")
            .populate("category")
            .populate("reviews");
        return res.send({ book });
    } catch (error) {
        if (error.name === "CastError") {
            next(new Error("No such book."));
        } else {
            next(error);
        }
    }
};

// Abb book
bookController.createBook = async (req, res, next) => {
    console.log("here---------------------");

    const { name, image, author, category } = req.body;
    const newBook = new Book({ name, image, author, category });

    try {
        const book = await newBook.save();
        return res.send({ book });
        // return res.status(200).send("Record added successfully");
    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            next(new Error("You must enter a book name."));
        } else {
            next(error);
        }
    }
};

// Update specific book
bookController.updateById = async (req, res, next) => {
    console.log(req.body);

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        console.log(book);

        return res.status(200).send("Record updated successfully");
    } catch (error) {
        if (error.name === "CastError") {
            next(new Error("No such book."));
        } else {
            next(error);
        }
    }
};

// Delete specific book
bookController.deleteById = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id, req.body);
        return res.status(200).send("Record deleted successfully");
    } catch (error) {
        if (error.name === "CastError") {
            next(new Error("No such book."));
        } else {
            next(error);
        }
    }
};

// Add Rating
bookController.addRate = async (req, res) => {
    try {
        const { averageRating } = req.body;
        const newRate = await Book.create({ averageRating });
        const book = await Book.findOneAndUpdate(req.params.bookId, req.body);
        book.rates.push(newRate._id);
        await book.save();
        console.log("Rating added to book");
        return res.status(201).send(newRate);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

module.exports = bookController;
