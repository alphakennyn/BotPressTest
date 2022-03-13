const { readDirectory } = require('../service/fileScrape')

module.exports = async (req, res, next) => {
    try {
        const { path } = req.query;

        // validate path
        console.log(readDirectory)
        const items = await readDirectory(path)
        
        req.items = items;
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}