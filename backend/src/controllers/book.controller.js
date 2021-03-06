const Book = require("../models/book");
const author = require("../models/author");
const category = require("../models/category");
const review = require("../models/review");
const userRate = require("../models/usersBooks");
const imageUpload = require("../imageUpload");
const { response } = require("../middlewares");

const bookController = {};

// const bookController = require('../controllers/book.controller');

//get popular books
bookController.getPopularBooks =async (req, res) => {
    console.log("in function");

    // Retrieve books sorted by popularity and limited to 3 //desc
    Book.find({}, null, { sort: { popularity: -1 }, limit: 4 })
        .populate("author")
        .populate("category")
        .then((books) => {
            console.log("====================================");
            console.log(books);
            console.log("====================================");
            res.status(200).json(books);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ err: err });
        });

    // try {
    //     book = await Book.find({}).sort({ averageRating: -1 }).limit(4).populate('category').populate('author');
    //     res.status(200).json(book);
    //   } catch (error) {
    //     next(error);
    //   }
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

// get all for display
bookController.display = async (req, res, next) => {
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
        const book = await Book.findById(req.params.id)
            .populate("author")
            .populate("category")
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            });
        return res.send({ book });
    } catch (error) {
        if (error.name === "CastError") {
            next(new Error("No such book."));
        } else {
            next(error);
        }
    }
};

// Add book
bookController.createBook = async (req, res, next) => {
    console.log("here---------------------");
    // console.log(req.body);
    // console.log(req.body.image);

    try {
        imageUpload(req, res, async () => {
            try {
                // if (req.body.image == undefined) {
                //     return res.status(400).send("Entre your image");
                // } else {
                // const image = req.body.image.name;
                const { name, author, category } = req.body;
                const newBook = new Book({ name, author, category }); // add image
                const book = await newBook.save();
                // console.log(book);
                return res.send({ book });

                // return res.status(200).send("Record added successfully");
            } catch (error) {
                if (error.name === "MongoError" && error.code === 11000) {
                    next(new Error("You must enter a book name."));
                } else {
                    next(error);
                }
            }
        });
    } catch (error) { }
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
        // book.rates.push(newRate._id);
        await book.save();
        console.log("Rating added to book");
        return res.status(201).send(newRate);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

// bookController.updateAvgRate = async (req, res) => {    
//     const usersRate = userRate.find({ book: req.body.book._id });
//     let res = 0;
//     usersRate.forEach(user => {
//         res = res + user.myRate; 
//     });
//     const avg = res / (await usersRate).length;
//     await Book.findOneAndUpdate(req.body.book._id, {averageRating: avg});
// }

module.exports = bookController;
