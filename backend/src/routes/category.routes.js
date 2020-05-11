const router = require('express').Router();
const categoryController = require('../controllers/category.controller');


router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/new', categoryController.create);
router.delete('/:id', categoryController.deleteById);
router.put('/:id', categoryController.updateById);


module.exports = router;