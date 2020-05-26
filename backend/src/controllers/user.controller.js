const User = require("../models/user");
const UsersBooks = require("../models/usersBooks");
const Book = require("../models/book");
const Category = require("../models/category");
const Author = require("../models/author");
const { response } = require("../middlewares");
const { user } = require("../routes/user.routes");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

let userController = {};

userController.regesiter = async (req, res, next) => {
    const { username, firstName, lastName, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password,
        firstName,
        lastName,
    });

    try {
        const user = await newUser.save();
        return res.send({ user });
    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            next(new Error("email must be unique"));
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
                const token = jwt.sign({ _id: user._id }, secret, {
                    expiresIn: expire,
                });
                /**
                 * we will use this token with passport to make sure that the server can recognize the toke :)
                 */
                // request.headers.authorization = token;

                response.send({ token, user });
            } else {
                response.status(401).send({
                    error: "Invalid username or password",
                });
            }
        });
    } catch (error) {
        next(error);
    }
};

userController.me = (req, res, next) => {
    const { user } = req;
    res.send({ user });
};

userController.getUserBooks = async (req, res) => {
    const allUserBooks = await UsersBooks.find({ user: req.user._id }).populate(
        {
            path: "book",
            populate: { path: "author", model: "author" },
        }
    );
    return res.json(allUserBooks);
};

userController.addUserBook = async (req, res) => {
    const { bookID, fieldName, fieldValue } = req.body;
    const query = { book: bookID, user: req.user._id };
    const opitions = { upsert: true, new: true, setDefaultsOnInsert: true };
    const item = await UsersBooks.findOneAndUpdate(
        query,
        { [fieldName]: fieldValue },
        opitions
    );

    if (fieldName === "myRate") {
        const userBooks = await UsersBooks.find({ book: item.book }).select(
            "myRate"
        );
        let result = 0;
        userBooks.map((rate) => {
            result += rate.myRate;
            return result;
        });

        const avg = result / userBooks.length;
        await Book.findByIdAndUpdate(item.book, { averageRating: avg });
    }
    else if (fieldName === "shelf") {
        await Book.findByIdAndUpdate(bookID, { $inc: { popularity: 1 } }, { new: true });
    }
};


userController.getUserBookByBookId = async (req, res) => {
    const { id } = req.params;
    const UserBook = await UsersBooks.find({
        user: req.user._id,
        book: id,
    });
    return res.send(UserBook);
};

module.exports = userController;
