const Author = require('../models/author');
const { response } = require('../middlewares');

const categoryController = {};


categoryController.getAll = async (req, res) => {
    try {
        const allAuthors = await Author.find({}).exec();
        return res.json(allAuthors);
    } catch (error) {
        console.log(error)
        return res.send(error);
    }

};


categoryController.create = async (req, res, next) => {
    const { name } = req.body;
    const newCategory = new Category({
        name,
    });

    try {
        const category = await newCategory.save();
        return res.send({ category });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('You must enter a category name.'));
        } else {
            next(error);
        }

    }
};


categoryController.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.send({ category });
    } catch (error) {
        if (error.name === 'CastError') {
            next(new Error('No record with that id.'));
        } else {
            next(error);
        }
    }
};

categoryController.deleteById = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id, req.body);
        return res.status(200).send('Record deleted successfully');
    } catch (error) {
        if (error.name === 'CastError') {
            next(new Error('No record with that id.'));
        } else {
            next(error);
        }
    }
};

categoryController.updateById = async (req, res, next) => {

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send('Record updated successfully');
    } catch (error) {
        if (error.name === 'CastError') {
            next(new Error('No record with that id.'));
        } else {
            next(error);
        }
    }

};

module.exports = categoryController;