const { readDirectory } = require('../service/fileScrape')

module.exports = async (req, res, next) => {
    try {
        const { path } = req.query;

        // validate path
    
        const items = await readDirectory(path)
        
        req.directoryItems = items;
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}