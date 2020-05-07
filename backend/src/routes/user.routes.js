const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport');

router.post('/register', userController.regesiter)
router.post('/login', userController.login)
    // router.all('*', (req, res, next) => {
    //     passport.authenticate('jwt', { session: false }, (err, user) => {
    //         if (err || !user) {
    //             const err = new Error("You are not Authorized to access this page");
    //             err.status = 401;
    //             throw err;

//         }
//         req.user = user;
//         return next();
//     })(req, res, next);
// });

//_____________________________Protected route_____________
router.get('/me',
    passport.authenticate('jwt', { session: false }, (req, res, next) => {
        return res.send({ "message": "hey auth" })
    }));


module.exports = router;