const { readDirectory } = require('../service/fileScrape')
const logger = require('../utils/logger');

const ITEM_TYPE = {
    FILE: 'FILE',
    DIRECTORY: 'DIRECTORY',
    UNKOWN: 'UNKNOWN'
};

const determineItemType = (item) => {
    if (item.isFile()) {
        return ITEM_TYPE.FILE
    } else if (item.isDirectory()) {
        return ITEM_TYPE.DIRECTORY
    }

    return ITEM_TYPE.UNKOWN
}

module.exports = async (req, res, next) => {
    try {
        if(!req.directoryItems) res.status(500).send('No items to label')

        const labelledItems = req.directoryItems.map(item => ({
            name: item.name,
            type: determineItemType(item)
        }))

        req.items = labelledItems;
        next();
    } catch (error) {
        res.status(500).send(error.message)
    }
}