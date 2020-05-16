const router = require("express").Router();
const bookController = require("../controllers/book.controller");
router.get("/popular", bookController.getPopularBooks);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/new", bookController.createBook);
router.delete("/:id", bookController.deleteById);
router.put("/:id", bookController.updateById);
module.exports=router;