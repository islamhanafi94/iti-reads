const router = require("express").Router();
const bookController = require("../controllers/book.controller");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/new", bookController.create);
router.delete("/:id", bookController.deleteById);
router.put("/:id", bookController.updateById);
router.get("/populars", bookController.getPopularBooks);

module.exports = router;