#!/usr/bin/env node
const { program } = require("commander");
const { compressFile, decompressFile } = require("../commands/compress");
const { stringManipulation } = require("../commands/stringUtils");
const { weatherData } = require("../commands/weather");

program
  .version("1.0.0")
  .description("Command-line utility tool")
  .addHelpText(
    "beforeAll",
    `
Available Commands:

  String Manipulation:
    upper <filePath>         Convert file content to uppercase
    lower <filePath>         Convert file content to lowercase
    count <filePath>         Count words in file
    palindrome <filePath>    Count palindromes in file

  File Compression:
    compress <filePath>      Compress a file
    decompress <filePath>    Decompress a file

  Weather Data:
    weather <city>           Get weather for a city

Example Usage:
  cli-tool upper .../downloads/notes.txt
  cli-tool compress .../documents/data.txt
  cli-tool weather Surat

What would you like to do?
`
  );

program
  .command("compress <inputFile>")
  .description("Compress a file (text file preferable)")
  .action((inputFile) => {
    compressFile(inputFile);
  });

program
  .command("decompress <inputFile>")
  .description("Decompress a file (text file preferable)")
  .action((inputFile) => {
    decompressFile(inputFile);
  });

program
  .command("upper <filePath>")
  .description("Convert file content to uppercase")
  .action((filePath) => stringManipulation("upper", filePath));

program
  .command("lower <filePath>")
  .description("Convert file content to lowercase")
  .action((filePath) => stringManipulation("lower", filePath));

program
  .command("count <filePath>")
  .description("Count words in file")
  .action((filePath) => stringManipulation("count", filePath));

program
  .command("palindrome <filePath>")
  .description("Count palindromes in file")
  .action((filePath) => stringManipulation("palindrome", filePath));

program
  .command("weather <city>")
  .description("Get weather for a city")
  .action((city) => {
    weatherData(city);
  });

program.parse(process.argv);
