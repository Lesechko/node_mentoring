import csv from "csvtojson";
import { createWriteStream, createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "url";
import { writeFile } from "node:fs/promises";
import * as path from "path";

const join = (...args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, ...args);
};

const csvFilePath = join("csv", "nodejs-hw1-ex1.csv");
const txtFilePath = join("csv", "nodejs-hw1-ex1.txt");

async function createTxtFromCsv(src, dest) {
  csv()
    .fromFile(src)
    .then((jsonObj) => jsonObj.map((el) => JSON.stringify(el)).join("\n"))
    .then((content) => content && writeFile(dest, content))
    .catch(console.log);
}

async function createTxtFromCsvViaStream(src, dest) {
  pipeline(createReadStream(src), csv(), createWriteStream(dest)).catch(
    console.log
  );
}

//createTxtFromCsv(csvFilePath, txtFilePath);
//createTxtFromCsvViaStream(csvFilePath, txtFilePath);
