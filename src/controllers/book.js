const { Book } = require ('../models');

exports.create = async (req, res) => {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
};

exports.findAll = async (_, res) => {
    const books = await Book.findAll();
    res.status(200).json(books);
}

exports.findByPk = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'The book could not be found.'});
    };
};

exports.update = async (req, res) => {
    const [ updatedRows ] = await Book.update(req.body, { where: { id: req.params.id } });
    if (updatedRows) {
        res.status(200).json(updatedRows);
    } else {
        res.status(404).json({ error: 'The book could not be found.'});
    };
};

exports.destroy = async (req, res) => {
    const book = await Book.destroy({ 
        where: { id: req.params.id }
    });
    if (book) {
        res.status(204).json(book);
    } else {
        res.status(404).json({ error: 'The book could not be found.'});
    };
}