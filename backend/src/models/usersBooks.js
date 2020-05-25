const mongoose = require('mongoose')


const { Schema } = mongoose;
const usersBooksSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
    },
    shelf: {
        type: String,
        enum: ['to-read', 'reading', 'done'],
        default: 'to-read'
    },
    myRate: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
})


const UsersBooks = mongoose.model('usersBooks', usersBooksSchema);

module.exports = UsersBooks;
