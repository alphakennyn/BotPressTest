const labelDiretoryItems = require('../middlewares/labelDiretoryItems')
const readDirectory = require('../middlewares/readDirectory')

const getDirectory = (req, res) => {
    res.status(200).json({
        data: req.items
    })
}

module.exports = [
    readDirectory,
    labelDiretoryItems,
    getDirectory
]