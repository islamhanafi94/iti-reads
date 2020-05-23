const router = require("express").Router();
// const passport = require('passport');
const adminAuth = require('../config/adminAuth'); // DON'T FORGETTTTTT

const bookController = require("../controllers/book.controller");
router.get("/popular", bookController.getPopularBooks);
router.get("/", bookController.getAllBooks);
router.get("/all", bookController.display);
router.get("/:id", bookController.getBookById);
router.post("/new", bookController.createBook);
router.post("/:bookId", bookController.addRate);
router.delete("/:id", bookController.deleteById);
router.put("/:id",bookController.updateById);
module.exports=router;