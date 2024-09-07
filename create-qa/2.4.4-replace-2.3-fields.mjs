import { readFile } from "fs/promises";
import path from "path";

// Define the path to the text file
const splittedFilePath = path.join("text_files", "2.4.3-words-split.json");
const sourceFilePath = path.join("text_files", "2.3-qa-pairs.json");

// Asynchronously read the file
try {
  let result = [];

  const splittedData = await readFile(splittedFilePath, "utf8");
  const splittedDataJSON = JSON.parse(splittedData);
  const srcData = await readFile(sourceFilePath, "utf8");
  const srcDataJSON = JSON.parse(srcData);

  if (splittedDataJSON.length === srcDataJSON.length) {
    // console.log(splittedDataJSON.length);
    srcDataJSON.forEach((block, index) => {
      block.chinese = splittedDataJSON[index].chinese;
      block.pinyin = splittedDataJSON[index].pinyin;

      result.push(block);
    });
  }

  console.log(JSON.stringify(result));
} catch (error) {
  console.error("Error reading the file:", error);
}
