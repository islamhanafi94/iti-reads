const User = require('../models/user');
const UsersBooks = require('../models/usersBooks');
const Book = require('../models/book');
const Category = require('../models/category');
const Author = require('../models/author');
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

                response.send({ token, user });
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
    const { shelf } = req.body;
    try {
        const user = await User.findById(userId);
        //check if the user have the book in his my books array
        //flag to check the book existeng in the my books :
        //if book doesn't exist so change shelf and change flag to be existing 
        let bookIsExist = false;
        // console.log(user.mybooks);
        user.mybooks = user.mybooks.map((book) => {
            if (book.book.toString() === bookId) {
                book.shelf = shelf;
                bookIsExist = true;
            }
            return book;
        })
        // console.log("user.mybooks",user.mybooks);
        //if book doesn't exist and not in mybooks so 
        if (!bookIsExist) {

            user.mybooks = user.mybooks.concat({ book: mongoose.Types.ObjectId(bookId), shelf });
            /**
             *  findOneAndUpdate() returns the document as it was before update was applied. 
             * If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
             */
            Book.findByIdAndUpdate(bookId, { $inc: { popularity: 1 } }, { new: true });
        }
        //save user
        await user.save();
        return res.send({ "message": "your Shelves  successfully added" });
    } catch (error) {
        console.log(error);

        return res.status(500).end();
    }
}

userController.me = (req, res, next) => {
    const { user } = req;
    res.send({ user });
}

userController.getUserBooks = async (req, res) => {
    const allUserBooks = await UsersBooks.find({ user: req.user._id }).populate(
        {
            path: 'book',
            populate: { path: 'author', model: 'author' }
        }
    );
    return res.json(allUserBooks);
}

userController.addUserBook = async (req, res) => {
    const newRecord = { user: req.user._id, ...req.body }
    const result = await UsersBooks.create(newRecord)
    return res.status(201).send('successfully created');
}


// userController.getUserBooks = async (req, res) => {
//     const allUserBooks = await User.findById(req.user._id).select('mybooks').populate('book');
//     return res.json(allUserBooks);
// }

// userController.addUserBook = async (req, res) => {
//     await User.findByIdAndUpdate(req.user._id, { $push: { mybooks: req.body } })
//     return res.status(201).send('successfully created');
// }

module.exports = userController;