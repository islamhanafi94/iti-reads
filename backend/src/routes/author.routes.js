const router = require('express').Router();
const authorController = require('../controllers/author.controller');
const passport = require('passport');
const adminAuth = require("../config/adminAuth");


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



router.get('/', authorController.getAll);
router.get('/:id', authorController.getOne);
router.post('/', adminAuth, authorController.create);
router.delete('/:id', adminAuth, authorController.deleteById);
router.put('/:id', adminAuth, authorController.updateById);


module.exports = router;