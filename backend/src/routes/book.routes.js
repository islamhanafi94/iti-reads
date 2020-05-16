const router = require("express").Router();
// const passport = require('passport');
const adminAuth = require('../config/adminAuth');

const bookController = require("../controllers/book.controller");
router.get("/popular", bookController.getPopularBooks);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/new",adminAuth, bookController.createBook);
router.delete("/:id",adminAuth, bookController.deleteById);
router.put("/:id", adminAuth,bookController.updateById);
module.exports=router;