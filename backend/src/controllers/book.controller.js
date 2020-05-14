// const Book = require('../models/book');
// bookController = {};

// bookController.popular = (req, res) => {
//     // Retrieve books sorted by popularity and limited to 3 //desc 
//     Book.find({}, null, { sort: { popularity: -1 }, limit: 3 }).populate('author').populate('category').then((books) => {
//         console.log('====================================');
//         console.log(books);
//         console.log('====================================');
//         res.status(200).json({ "data": books });
//     }).catch((err) => {
//         console.log(err);

//         // res.status(500).send({ "error": err, "p": "popular" });
//     });
// };

// // const search = async (req, res) => {
// //     //if thete is query get it , if not let it empty
// //     const query = req.query.query || "";
// //     try {
// //         //get books
// //         const books = await Book.find({ name: { $regex: query, $options: "i" } })

// //     } catch (error) {

// //     }
// // }
// module.exports = bookController;