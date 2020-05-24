const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');
const mongoose = require('mongoose');


// @route   GET /
// @desc    Search result from NavBar 
// @access  Private - user
//{{url}}?searchWord=zakaria
router.get('/', async (req, res) => {
    try {
        const searchWord = req.query.searchWord;
        const books = Book.find({ name: new RegExp(searchWord, 'i') });
        const authors = Author.find({
            $or: [{ name: new RegExp(searchWord, 'i') },
            { lastName: new RegExp(searchWord, 'i') }]
        });
        const result = await Promise.all([books, authors]);
        res.send(result);
    } catch (e) {
        res.status(500).send({ msg: "Sorry, Server Error" });
    }

})
module.exports=router;