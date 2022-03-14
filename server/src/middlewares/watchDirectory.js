const { watch } = require("fs");
const http = require('http');

const logger = require("../utils/logger");
const { normalize, join } = require('path')
const EVENT_SERVER_URL = 'http://localhost:3002/event/fileChange';

module.exports = (req, res, next) => {
  try {
    const { path, clientId } = req.query;
    logger.info(`Watching ${path}` );

    watch(path, { recursive: true }, async (eventType, filename ) => {
      try {
        const file = normalize(join(path, filename));
        logger.event.log(eventType, file);
        // do whatever...
        await http.get(`${EVENT_SERVER_URL}?path=${path}`);
        // dont forget to throttle as rename event is dispatched twice
      } catch (e) {
        logger.error(e.message)
      }
    });
    next();
  } catch (error) {
    if (error.name === "AbortError") return;
    throw error;
  }
};
