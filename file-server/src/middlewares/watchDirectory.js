const { watch } = require("fs");
const chokidar = require("chokidar");

const http = require("http");

const logger = require("../utils/logger");
const { normalize, join } = require("path");
const EVENT_SERVER_URL = "http://localhost:3002/event/fileChange";

const CHANGE_EVENT = 'change'
let wait = false;

module.exports = (req, res, next) => {
  try {
    const { path, clientId, ignoreDot } = req.query;
    logger.info(`Watching ${path}`);

    const watchOptions = {
      depth: 99,
      usePolling: true
    };

    if (ignoreDot) {
      watchOptions.ignored = /(^|[\/\\])\../;
    }

    const watcher = chokidar.watch(path, watchOptions);

    watcher.on("raw", (event, filename) => {
    // watcher.on("raw", async (filename) => {
        try {
          logger.event.log(event, filename);
          if (event === CHANGE_EVENT) {
            if (wait) return
            wait = true;
            setTimeout(async() => {
              logger.info('change event detected, messaging client')
              await http.get(`${EVENT_SERVER_URL}?path=${path}&clientId=${clientId}`);
              wait = false;
            }, 100);
          }
          // dont forget to throttle as rename event is dispatched twice
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
