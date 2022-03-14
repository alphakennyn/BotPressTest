const express = require('express');
const getDirectory = require('./getDirectory');

const router = express.Router();

router.get('/readDirectory', getDirectory);

module.exports = router;