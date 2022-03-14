const { watch } = require("fs");
const logger = require("../utils/logger");
const { normalize, join } = require('path')

module.exports = (req, res, next) => {
  try {
    const { path } = req.query;
    logger.info(`Watching ${path}` );

    watch(path, { recursive: true }, (eventType, filename ) => {
        const file = normalize(join(path, filename));
        logger.event.log(eventType, file);
        // do whatever...
        // dont forget to throttle as rename event is dispatched twice
    });
    next();
  } catch (error) {
    if (error.name === "AbortError") return;
    throw error;
  }
};
