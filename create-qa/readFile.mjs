import { readFile } from 'fs/promises';
import path from 'path';

// Define the path to the text file
const filePath = path.join('text_files', '2-qa-pairs.txt');

// Asynchronously read the file
try {
  const data = await readFile(filePath, 'utf8');
  console.log(data);
} catch (error) {
  console.error('Error reading the file:', error);
}

