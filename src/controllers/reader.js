const { Reader } = require ('../models');

exports.create = async (req, res) => {
    const newReader = await Reader.create(req.body);
    res.status(201).json(newReader);
};

exports.findAll = async (_, res) => {
    const readers = await Reader.findAll();
    res.status(200).json(readers);
}