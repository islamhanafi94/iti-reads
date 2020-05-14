const User = require('../models/user');
const Book = require('../models/book');
const { response } = require('../middlewares');
const { user } = require('../routes/user.routes');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let userController = {};
userController.regesiter = async (req, res, next) => {
    const { username, firstName, lastName, email, password } = req.body
    const newUser = new User({
        username,
        email,
        password,
        firstName,
        lastName
    });

    try {
        const user = await newUser.save();
        return res.send({ user });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('email must be unique'));
        } else {
            next(error);
        }

    }
};

userController.login = async (request, response, next) => {
    const { email, password } = request.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(`the email ${email} was not found`);
            err.status = 401;
            return next(err);
        }
        // console.log("User", user);
        user.isPasswordMatch(password, user.password, (err, matched) => {
            if (matched) {
                //Generate jwt if credintials okay
                //secret 
                const secret = process.env.secret;
                //expiration
                const expire = process.env.expirationDate;
                //for now just id but we can pass all the user object {sub:user._id}
                const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });
                /**
                 * we will use this token with passport to make sure that the server can recognize the toke :)
                 */
                // request.headers.authorization = token;

                response.send({ token });
            } else {
                response.status(401).send({
                    error: "Invalid username or password"
                });
            }
        })
    } catch (error) {
        next(error);
    }
}
// manageShelves
userController.manageShelves = async (req, res, next) => {
    const bookId = req.params.id;
    const userId = req.params.user_id;
    console.log("bookId:", bookId, "userId", userId);
    const { body: { shelf } } = req;
    console.log(shelf);
    try {
        const user = await User.findById(userId);
        let bookIsExist = false;
        user.mybooks = user.mybooks.map((book) => {
            console.log("book.mybooks", book.mybooks);

            if (book.mybooks.toString() === bookId) {
                book.shelf = shelf;
                bookIsExist = true;
            }
            return book;
        });
        if (!bookIsExist) {
            console.log("Not exist");

            user.mybooks = user.mybooks.concat({ book: mongoose.Types.ObjectId(bookId), shelf });
            console.log("user.mybooks:::::", user.mybooks);

            Book.findByIdAndUpdate(bookId, {
                $inc: {
                    popularity: 1
                }
            }, { new: true });
        }
        await user.save();
        return res.send({ "message": "your Shelves  successfully added" });
    } catch (error) {
        console.log(error);

        return res.status(500).end();
    }
};

userController.me = (req, res, next) => {
    const { user } = req;
    console.log("req.body ::", req.body);
    res.send({ user });
}
module.exports = userController;