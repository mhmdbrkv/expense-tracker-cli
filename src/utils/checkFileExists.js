const fs = require("node:fs/promises");

const checkFileExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = checkFileExists;
