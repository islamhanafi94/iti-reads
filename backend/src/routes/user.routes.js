const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');

//Login and Sign up localhost:5000/user/login
router.post('/register', userController.regesiter);
router.post('/login', userController.login);

// Customize auth message Protect the  routes
// and prevent copy paste {passport.authenticate('jwt', { session: false }),}

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

//_____________________________Protected route  (all user routes will be here )_____________________________________

router.post('/:user_id/books/:id', userController.manageShelves);


router.get('/me',
    (req, res, next) => {
        return res.send({ msg: "okey you are authorized now :)", user: req.user })
    });


module.exports = router;