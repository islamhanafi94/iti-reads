const router = require('express').Router();
const reviewController = require('../controllers/review.controller');


router.post('/:bookId', reviewController.addReview);
router.delete('/:bookId', reviewController.deleteReview);

module.exports = router;