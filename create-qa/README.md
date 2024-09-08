1. Transcribe StoryLearning Audio `(Chapter N.mp3)` to Chinese Text using Whisper 
   Save the transcription to `./text_files/2.1-whisper-transcription.txt`
2. Create Q&A for Each Sentence of the Result 2.1 (=manually=) using ChatGPT
   Save the result to `./text_files/2.2-qa-pairs.txt`
3. Run `node 2.3-generateChineseEnglishQAJSON.mjs` to get the console.log data and save it to a new JSON file `./text_files/2.3-qa-pairs.json`
4. Split Pinyin and Chinese Words with "|" using ChatGPT (created manually) 
   Then, copy the result and paste to a new text file `./text_files/2.4.2-words-split.txt`
   Next, run `node 2.4.3-splitted-text-to-json.mjs` and copy the console.log data and save it to a new JSON file `./text_files/2.4.3-words-split.json`
   Finally, run `node 2.4.4-replace-2.3-fields.mjs` to get the console.log data of a json data which contains the final result with qa pairs in splitted form and save them to a new JSON file `./text_files/2.4.4-words-split-full.json`
5. Run `node 2.3-generateChineseEnglishQAJSON.mjs` but to get the console.log data of only the Chinese text.
   Copy and paste them to luvvoice.com/chinese and download the mp3 file, store it at `./audio/speech.mp3`
   Then, run `node whisper.mjs` on the audio file, and save the console.log data to `./text_files/2.5.3-timestamps.json`.
   Finally, run `node 2.5.4-merge-timestamp.mjs`, if the length of `2.4.4-words-split-full.json` and `2.5.3-timestamps.json` are equal, you will get the final console.log data `2.5.4.json` 
6. `./audio/speech.mp3` and `./text_files/2.5.4.json` are the final results needed to run on ministoryapp.com.
   The content of json file goes to firebase.
   The audio file is imported every time you want to expose yourself to the Chinese language.

```json
{
    "info": {
        "lessonSubtitle": "Lesson N Mini-story",
        "lessonTitle": "",
        "lessonId": "chinese-english-lessonN-ms",
        "lessonDurationInSeconds": 0
  },
    "text": {
        [...]
    }
}
```