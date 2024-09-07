import { readFile } from "fs/promises";
import path from "path";

// Define the path to the text file
const wordsSplitFullPath = path.join(
  "text_files",
  "2.4.4-words-split-full.json"
);
const timestampsDataPath = path.join("text_files", "2.5.3-timestamps.json");

// Asynchronously read the file
try {
  let result = [];

  const wordsSplitFull = await readFile(wordsSplitFullPath, "utf8");
  const wordsSplitFullJSON = JSON.parse(wordsSplitFull);
  const timestampsData = await readFile(timestampsDataPath, "utf8");
  const timestampsDataPathJSON = JSON.parse(timestampsData);

  if (wordsSplitFullJSON.length === timestampsDataPathJSON.length) {
    // console.log(wordsSplitFullJSON.length);
    wordsSplitFullJSON.forEach((block, index) => {
      block.start = timestampsDataPathJSON[index].start;
      block.end = timestampsDataPathJSON[index].end;
      result.push(block);
    });
  }

  console.log(JSON.stringify(result));
} catch (error) {
  console.error("Error reading the file:", error);
}
