const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isadmin: {
        type: Boolean,
        default: false,

    },
    password: { type: String, required: true }


})

userSchema.pre('save', async function(next) {
    // const user = this;
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

userSchema.methods.isPasswordMatch = function(password, hashed, callback) {
    bcrypt.compare(password, hashed, (err, sucess) => {
        if (err) {
            return callback(err);
        }
        return callback(null, sucess);
    });


}

const User = mongoose.model('User', userSchema);
module.exports = User;