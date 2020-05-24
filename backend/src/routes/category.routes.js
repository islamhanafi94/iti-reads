const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const passport = require('passport');
const adminAuth = require("../config/adminAuth");

// router.all('*', (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user) => {
//         if (err || !user) {
//             const error = new Error('You are not authorized to access this area');
//             error.status = 401;
//             //in the middleware file  will catch it
//             throw error;
//         }

//         //
//         req.user = user;
//         //every loged in request we will get the user object
//         return next();
//     })(req, res, next); //miidleware of passport
// });

router.get('/', categoryController.getAllCategories);
router.get('/popular', categoryController.popular);
router.get('/:id', categoryController.getCategoryById);
router.post('/new', adminAuth, categoryController.create);
router.delete('/:id', adminAuth, categoryController.deleteById);
router.put('/:id', categoryController.updateById);


module.exports = router;