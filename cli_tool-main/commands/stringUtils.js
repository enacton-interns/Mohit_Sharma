const fs = require("fs");
const logger = require("../utils/logger");
const { log: consoleLogger } = require("console");

function stringManipulation(operation, filePath) {
  if (!fs.existsSync(filePath)) {
    logger.error(`File not found: ${filePath}`);
  }

  const contentOfFile = fs.readFileSync(filePath, "utf-8");
  let result = "";

  switch (operation.toLowerCase()) {
    case "upper":
      result = contentOfFile.toUpperCase();
      break;

    case "lower":
      result = contentOfFile.toLowerCase();
      break;

    case "count":
      wordCount = contentOfFile.trim().split(/\s+/).length;
      consoleLogger(`Word count: ${wordCount}`);
      return;

    case "palindrome":
      const palindromeCount = contentOfFile
        .trim()
        .split(/\s+/)
        .filter((word) => word === word.split("").reverse().join("")).length;
      consoleLogger(`Palindrome count: ${palindromeCount}`);
      return;

    default:
      logger.error("Unsupported string operation.");
      return;
  }

  fs.writeFileSync(filePath, result);
  consoleLogger(`Modified content written to ${filePath}`);
}

module.exports = {
  stringManipulation,
};
