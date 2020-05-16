const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
// const { delete } = require('../middlewares');
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    firstName: { type: String, required: "Your first Name is required" },
    lastName: { type: String, required: "Your last Name is required" },
    avatar: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    isadmin: {
        type: Boolean,
        default: false,

    },
    password: { type: String, required: true }
    ,
    mybooks: [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
        shelf: {
            type: String,
            enum: ['to-read', 'reading', 'done'],
        },
        myRate: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        }
    }]
})




/**
 * Custom Functionality for Authntication System Using bcryptjs
 */
userSchema.pre('save', async function (next) {
    console.log("this::", this);
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error)
    }

});


/**
 * 
 * @param {*} password 
 * @param {*} hashed 
 * @param {*} callback 
 * Check password with hashed password  using it in  User-Controller 
 */
userSchema.methods.isPasswordMatch = function (password, hashed, callback) {
    bcrypt.compare(password, hashed, (err, sucess) => {
        if (err) {
            return callback(err);
        }
        return callback(null, sucess);
    });
}



/**
 * /// delete password and customize user 
 * override toJSON
 */
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.token;
    return userObject;
}

const User = mongoose.model('user', userSchema);
module.exports = User;
