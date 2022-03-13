const { resolve } = require('path');
const { readdir } = require("fs").promises;

const logger = require("../utils/logger");

const readDirectory = async (dirname) => {
  try {
    const dirents = await readdir(dirname, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map(async (dirent) => {
        const res = resolve(dirname, dirent.name);
        const data = {
            value: dirent.name
        }
        if (dirent.isDirectory()) {
            data.nodes = await readDirectory(res) 
        }
        return data;
      })
    );
    return files;
  } catch (error) {
    logger(error.message);
    throw error;
  }
};

exports.readDirectory = readDirectory;
