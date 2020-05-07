const router = require('express').Router();
const CategoryModel = require('../models/category')

router.get('/', async (req, res) => {
    const allCategories = await CategoryModel.find({}).exec((err, data) => {
        if (err) {
            return res.send(err);
        }
        res.json(data);
    });
})