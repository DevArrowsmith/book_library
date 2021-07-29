const { Reader } = require ('../models');

exports.create = async (req, res) => {
    const newReader = await Reader.create(req.body);
    res.status(201).json(newReader);
};

exports.findAll = async (_, res) => {
    const readers = await Reader.findAll();
    res.status(200).json(readers);
}

exports.findByPk = async (req, res) => {
    const reader = await Reader.findByPk(req.params.id);
    if (reader) {
        res.status(200).json(reader);
    } else {
        res.status(404).json({ error: 'The reader could not be found.'});
    };
};

exports.update = async (req, res) => {
    const reader = await Reader.update(req.body, { where: {} });
    res.status(200).json(reader);
}

exports.destroy = async (req, res) => {
    const reader = await Reader.destroy({ 
        where: { id: req.params.id }
    });
    res.status(204).json(reader);
}