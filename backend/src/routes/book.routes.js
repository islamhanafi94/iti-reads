const router = require("express").Router();
const bookModel = require("../models/book");
// const bookController = require('../controllers/book.controller');

//get popular books 
router.get('/populars', (req, res) => {
    // Retrieve books sorted by popularity and limited to 3 //desc 
    bookModel.find({}, null, { sort: { popularity: -1 }, limit: 3 }).populate('author').populate('category').then((books) => {
        console.log('====================================');
        console.log(books);
        console.log('====================================');
        res.status(200).json({ "data": books });
    }).catch((err) => {
        console.log(err);

        res.status(500).send({ err: err });
    });
});

// Get all books
router.get("/", async (req, res, next) => {
    try {
        book = await bookModel.find({});
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

// Get specific book
router.get("/:id", async (req, res, next) => {
    try {
        book = await bookModel.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

// Abb book
router.post("/", async (req, res, next) => {
    let { body } = req;
    let book = new bookModel(body);
    try {
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
});

// Update specific book
router.patch("/:id", async (req, res, next) => {
    let { body } = req;
    try {
        let book = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: body },
            { new: true }
        );
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

// Delete specific book
router.delete("/:id", async (req, res, next) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).send("Book has been deleted successfully");
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = router;