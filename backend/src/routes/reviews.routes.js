const router = require('express').Router();
const reviewController = require('../controllers/review.controller');

router.all('*', (req, res, next) => {

    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = new Error('You are not authorized to access this area');
            error.status = 401;
            //in the middleware file  will catch it
            throw error;
        }

        //
        req.user = user;
        //every loged in request we will get the user object
        return next();
    })(req, res, next); //miidleware of passport
});


router.post('/:bookId', reviewController.addReview);
router.delete('/:bookId', reviewController.deleteReview);

module.exports = router;