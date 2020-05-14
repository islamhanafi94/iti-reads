const router = require('express').Router();
const authorController = require('../controllers/author.controller');


router.get('/', authorController.getAll);
router.get('/:id', authorController.getOne);
router.post('/new', authorController.create);
router.delete('/:id', authorController.deleteById);
router.put('/:id', authorController.updateById);


module.exports = router;