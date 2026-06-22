import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '..', 'public', 'favicon.png');
const outputPath = inputPath; // overwrite

const inputSize = fs.statSync(inputPath).size;

// Resize to 64x64 and save as PNG (favicon should be small)
await sharp(inputPath)
  .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ quality: 90 })
  .toFile(inputPath.replace('favicon.png', 'favicon-optimized.png'));

const outputSize = fs.statSync(inputPath.replace('favicon.png', 'favicon-optimized.png')).size;
console.log(`favicon: ${(inputSize/1024).toFixed(0)} KB -> ${(outputSize/1024).toFixed(0)} KB (${((1-outputSize/inputSize)*100).toFixed(0)}% smaller)`);

// Also create a 32x32 version
await sharp(inputPath)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(inputPath.replace('favicon.png', 'favicon-32.png'));

const size32 = fs.statSync(inputPath.replace('favicon.png', 'favicon-32.png')).size;
console.log(`favicon-32: ${(size32/1024).toFixed(1)} KB`);
