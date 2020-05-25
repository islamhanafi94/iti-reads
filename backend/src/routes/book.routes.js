const router = require("express").Router();
const passport = require('passport');
const adminAuth = require('../config/adminAuth'); // DON'T FORGETTTTTT

const bookController = require("../controllers/book.controller");


// router.all('*', (req, res, next) => {

//     passport.authenticate('jwt', { session: false }, (err, user) => {
//         if (err || !user) {
//             const error = new Error('You are not authorized to access this area');
//             error.status = 401;
//             //in the middleware file  will catch it
//             throw error;
//         }

//         //
//         req.user = user;
//         //every loged in request we will get the user object
//         return next();
//     })(req, res, next); //miidleware of passport
// });


router.get("/popular", bookController.getPopularBooks);
router.get("/", bookController.getAllBooks);
router.get("/all", bookController.display);
router.get("/:id", bookController.getBookById);
router.post("/new", adminAuth, bookController.createBook);
router.post("/:bookId", bookController.addRate);
router.delete("/:id", adminAuth, bookController.deleteById);
router.put("/:id", adminAuth, bookController.updateById);
module.exports = router;