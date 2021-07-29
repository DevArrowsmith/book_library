const express = require('express');
const readerController = require('../controllers/reader');

const router = express.Router();

router.post('/', readerController.create);

router.get('/', readerController.findAll);

router.get('/:id', readerController.findByPk)

module.exports = router;