const fs = require("fs");
const path = require("path");
const config = require("../config/default");
const logger = require("../utils/logger");

async function writeJson(data) {
  const filePath = path.resolve(__dirname, "../../", config.output.json);

  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    logger.log(`JSON data saved to: ${filePath}`);
  } catch (error) {
    logger.error("Error writing JSON file");
    logger.error(error.stack || error.message);
  }
}

module.exports = { writeJson };
