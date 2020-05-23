const Author = require('../models/author');
const { response } = require('../middlewares');

const authorController = {};


authorController.getAll = async (req, res) => {
    try {
        const allAuthors = await Author.find({}).exec();
        return res.json(allAuthors);
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
};

authorController.getOne = async (req, res) => {
    try {
        const author = await Author.findOne({ _id: req.params.id }).exec();
        return res.json(author);
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
};

authorController.create = async (req, res) => {
    const { firstName, lastName, dateOfBirth } = req.body;
    try {
        const author = await Author.create({ firstName, lastName, dateOfBirth });
        return res.status(201).send(author);
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
};

authorController.deleteById = async (req, res) => {
    try {
        // const author = await Author.findByIdAndDelete(req.params.id);
        Author.findById(req.params.id, function(err, doc){
            if(err){
                next("cann't found author");
            }
            doc.deleteOne(function(err){
                if(err){
                    console.log(err);
                    
                }
            })
        })
        return res.send(author)
    } catch (error) {
        return res.send(error);
    }
}

authorController.updateById = async (req, res) => {
    try {
        const newAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(newAuthor);
    } catch (error) {
        return res.send(error);
    }
}

module.exports = authorController;