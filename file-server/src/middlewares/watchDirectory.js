const chokidar = require("chokidar");
const http = require("http");
const {
  EVENT_SERVER_URL,
  CHANGE_EVENT,
  FOLDERS_IGNORE,
} = require("../utils/constants");

const logger = require("../utils/logger");

let wait = false;

module.exports = (req, res, next) => {
  try {
    const { path, clientId, ignoreDot } = req.query;
    logger.info(`Watching ${path}`);

    const watchOptions = {
      depth: 10,
      usePolling: true,
      persistent: true,
      ignored: FOLDERS_IGNORE,
    };

    const watcher = chokidar.watch(path, watchOptions);

    watcher.on("raw", (event, filename) => {
      try {
        logger.event.log(event, filename);
        if (event === CHANGE_EVENT) {
          if (wait) return;
          wait = true;
          // debounce CHANGE events
          setTimeout(async () => {
            logger.info("change event detected, messaging client");
            await http.get(
              `${EVENT_SERVER_URL}?path=${path}&clientId=${clientId}`
            );
            wait = false;
          }, 100);
        }
      } catch (e) {
        logger.error(e.message);
      }
    });
    next();
  } catch (error) {
    if (error.name === "AbortError") return;
    throw error;
  }
};
