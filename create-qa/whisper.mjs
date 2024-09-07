import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const result = [];
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("./audio/speech.mp3"),
    model: "whisper-1",
    response_format: "verbose_json",
    timestamp_granularities: ["segment"],
  });

  const segments = transcription.segments;
  segments.forEach((seg) => {
    const { id, text, start, end } = seg;
    const obj = {
      id,
      text,
      start,
      end,
    };
    result.push(obj);
  });

  console.log(result);
}
main();
