const fs = require("fs");
const zlib = require("zlib");
const { log: consoleLogger } = require("console");

function compressFile(inputFile) {
  const input = fs.createReadStream(inputFile);
  const outputFile = `${inputFile}.gz`;
  const output = fs.createWriteStream(outputFile);

  input
    .pipe(zlib.createGzip())
    .pipe(output)
    .on("finish", () => {
      consoleLogger(`Compressed ${inputFile} → ${outputFile}`);
    });
}
function decompressFile(inputFile) {
  const outputFile = inputFile.replace(/\.gz$/, "");

  fs.createReadStream(inputFile)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(outputFile))
    .on("finish", () => {
      consoleLogger(`Decompressed ${inputFile} → ${outputFile}`);
    });
}

module.exports = {
  compressFile,
  decompressFile,
};
