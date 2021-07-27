const getDb = require('../services/db');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, email } = req.body;
    try {
        await db.query('INSERT INTO Reader (name, email) VALUES (?, ?)', [
            name,
            email
        ]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500).json(error);
    }
    db.close();
};