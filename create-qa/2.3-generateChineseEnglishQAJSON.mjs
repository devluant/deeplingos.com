import crypto from "crypto";
import { readFile } from "fs/promises";
import path from "path";

// Define the path to the text file
const filePath = path.join("text_files", "2.2-qa-pairs.txt");

// Asynchronously read the file
try {
  const data = await readFile(filePath, "utf8");
  console.log(generateChineseEnglishQAJSON(data));
} catch (error) {
  console.error("Error reading the file:", error);
}

function generateChineseEnglishQAJSON(data) {
  const objArr = [];

  const blocks = data.split("\n\n");

  blocks.forEach((block) => {
    const lines = block.split("\n");

    const [pinyin, chinese, english, type] = lines;

    const obj = {
      id: crypto.randomUUID(),
      pinyin,
      chinese,
      english,
      type,
      start: 0,
      end: 0,
      speakerName: {
        pinyin: "n/a",
        chinese: "n/a",
        english: "n/a",
      },
      image: {
        src: "n/a",
        alt: "n/a",
      },
    };

    if (type.includes("dialogue")) {
      const [pinyinSpeakerName, chineseSpeakerName, englishSpeakerName] =
        lines[4].split("|");
      obj.speakerName.pinyin = pinyinSpeakerName.trim();
      obj.speakerName.chinese = chineseSpeakerName.trim();
      obj.speakerName.english = englishSpeakerName.trim();
    }

    if (lines.at(-1).includes(".webp")) {
      const [imgSrc, imgAlt] = lines.at(-1).split("|");
      obj.image.src = imgSrc.trim();
      obj.image.alt = imgAlt.trim();
    }

    objArr.push(obj);

    // Text Chinese Only for Step 2.4
    // console.log(chinese);

    //Text Pinyin and Chinese for Step 2.5
    console.log(`${pinyin.trim()}\n${chinese.trim()}\n`);
  });

  // return "";

  // JSON for Step 2.3
  // return JSON.stringify(objArr);
}
