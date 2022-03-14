const readDirectory = require('../middlewares/readDirectory')
const watchDirectory = require('../middlewares/watchDirectory')

const getDirectory = (req, res) => {
    res.status(200).json({
        data: req.items
    })
}

module.exports = [
    readDirectory,
    watchDirectory,
    getDirectory
]