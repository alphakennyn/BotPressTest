const logger = require("../utils/logger")
const fs = require("fs");

exports.readDirectory = async (dirname) => {
    try {
        const files = fs.readdirSync(dirname, { withFileTypes: true });
        return files;
    } catch (error) {
        logger(error.message)
    }
};