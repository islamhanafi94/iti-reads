const Book = require("../models/book");
const { response } = require("../middlewares");

const bookController = {};

// Get all books
bookController.getAllBooks = async (req, res, next) => {
    const allBooks = await Book.find({}).exec((err, data) => {
        if (err) {
            return res.send(err);
        }
        res.json(data);
    });
};

// Get specific book
bookController.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
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
    const { name } = req.body;
    const newBook = new Book({
        name,
    });

    try {
        const book = await newBook.save();
        return res.send({ book });
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
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
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

module.exports = bookController;