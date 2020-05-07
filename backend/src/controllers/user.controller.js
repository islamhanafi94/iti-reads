const User = require('../models/user');
const { response } = require('../middlewares');
const { user } = require('../routes/user.routes');
const jwt = require('jsonwebtoken');
let userController = {};
userController.regesiter = async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password
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


userController.me = (req, res, next) => {
    const { user } = req;
    console.log("req.body ::", req.body);

    res.send({ user });
}

module.exports = userController;