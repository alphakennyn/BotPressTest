const { watch } = require("fs");
const chokidar = require("chokidar");

const http = require("http");

const logger = require("../utils/logger");
const { normalize, join } = require("path");
const EVENT_SERVER_URL = "http://localhost:3002/event/fileChange";

const CHANGE_EVENT = 'change'

module.exports = (req, res, next) => {
  try {
    const { path, clientId, ignoreDot } = req.query;
    logger.info(`Watching ${path}`);

    const watchOptions = {
      depth: 99,
      usePolling: true,
      interval: 300,
    };

    if (ignoreDot) {
      watchOptions.ignored = /(^|[\/\\])\../;
    }

    const watcher = chokidar.watch(path, watchOptions);

    watcher.on("raw", async (event, filename) => {
    // watcher.on("raw", async (filename) => {
        try {
          const file = normalize(join(path, filename));
          logger.event.log('change', file);
          if (event === CHANGE_EVENT) {
          //   await http.get(`${EVENT_SERVER_URL}?path=${path}`);
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