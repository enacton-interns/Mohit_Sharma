const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const config = require("../config/default");
const logger = require("../utils/logger");

async function writeCsv(data) {
  const filePath = path.resolve(__dirname, "../../", config.output.csv);

  if (!data || data.length === 0) {
    logger.warn("No data to write to CSV.");
    return;
  }

  const headers = Object.keys(data[0]).map((key) => ({
    id: key,
    title: key.toUpperCase(),
  }));

  const csvWriter = createCsvWriter({
    path: filePath,
    header: headers,
  });

  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await csvWriter.writeRecords(data);
    logger.log(`✅ CSV data saved to: ${filePath}`);
  } catch (error) {
    logger.error("Error writing CSV file");
    logger.error(error.stack || error.message);
  }
}

module.exports = { writeCsv };
