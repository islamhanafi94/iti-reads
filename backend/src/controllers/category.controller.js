const Category = require("../models/category");
const { response } = require("../middlewares");
// const jwt = require('jsonwebtoken');

let categoryController = {};
categoryController.popular = (req, res) => {
    // Retrieve books sorted by popularity and limited to 9
    Category.find({}, null, {sort: {popularity: -1}, limit: 5}).then((categories) => {
        res.status(200).json(categories);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
};
categoryController.create = async (req, res, next) => {
    console.log("req.body = : ", req.body);
    const { name } = req.body;
    const newCategory = new Category({
        name,
    });

    try {
        const category = await newCategory.save();
        return res.send({ category });
    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            next(new Error("You must enter a category name."));
        } else {
            next(error);
        }
    }
};

categoryController.getAllCategories = async (req, res) => {
    const allCategories = await Category.find({}).exec((err, data) => {
        if (err) {
            return res.send(err);
        }
        res.json(data);
    });
};

categoryController.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.send({ category });
    } catch (error) {
        if (error.name === "CastError") {
            next(new Error("No record with that id."));
        } else {
            next(error);
        }
    }
};

categoryController.deleteById = async (req, res, next) => {
    try {
        // const category = await Category.findByIdAndDelete(
        //     req.params.id,
        //     req.body
        // );
        Category.findById(req.params.id, function (err, doc) {
            if (err) {
                next("cann't found category");
            }
            doc.deleteOne(function (err) {
                if (err) {
                    console.log(err);

                }
            })
        });
        return res.status(200).send("Record deleted successfully");
    } catch (error) {
        if (error.name === "CastError") {
            next(new Error("No record with that id."));
        } else {
            next(error);
        }
    }
};

categoryController.updateById = async (req, res, next) => {
    console.log("params :", req.params.id);
    console.log("req.body : ", req.body);
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        return res.status(200).send("Record updated successfully");
    } catch (error) {
        if (error.name === "CastError") {
            next(new Error("No record with that id."));
        } else {
            next(error);
        }
    }
};

module.exports = categoryController;
