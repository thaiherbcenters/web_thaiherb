import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '..', 'public', 'images', 'hero-bg-5.png');
const outputPath = inputPath.replace('.png', '.webp');

const inputSize = fs.statSync(inputPath).size;
await sharp(inputPath).webp({ quality: 95, effort: 6 }).toFile(outputPath);
const outputSize = fs.statSync(outputPath).size;

console.log(`hero-bg-5: ${(inputSize/1024).toFixed(0)} KB -> ${(outputSize/1024).toFixed(0)} KB (${((1-outputSize/inputSize)*100).toFixed(0)}% smaller)`);
