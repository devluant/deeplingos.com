import { readFile } from "fs/promises";
import path from "path";

// Define the path to the text file
const filePath = path.join("text_files", "2.4.2-words-split.txt");

// Asynchronously read the file
try {
  const data = await readFile(filePath, "utf8");
  const dataArr = [];
  const blocks = data.split("\n\n");
  blocks.forEach((block) => {
    const [pinyin, chinese] = block.split("\n");
    const obj = {
      pinyin,
      chinese,
    };
    dataArr.push(obj);
  });
  console.log(JSON.stringify(dataArr));
} catch (error) {
  console.error("Error reading the file:", error);
}
