import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 80;
const MIN_SIZE_KB = 500; // Only optimize images larger than 500KB

async function getAllImages(dir, images = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await getAllImages(filePath, images);
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
            const sizeKB = stat.size / 1024;
            if (sizeKB > MIN_SIZE_KB) {
                images.push({
                    path: filePath,
                    sizeKB: sizeKB,
                    sizeMB: (sizeKB / 1024).toFixed(2)
                });
            }
        }
    }

    return images;
}

async function optimizeImage(imagePath) {
    const ext = path.extname(imagePath).toLowerCase();
    const originalSize = fs.statSync(imagePath).size;

    try {
        // Read image into buffer first
        const inputBuffer = fs.readFileSync(imagePath);
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        let resized = sharp(inputBuffer);

        // Resize if too large
        if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
            resized = resized.resize(MAX_WIDTH, MAX_HEIGHT, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Optimize based on format
        let optimized;
        if (ext === '.png') {
            optimized = await resized.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer();
        } else {
            optimized = await resized.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
        }

        // Write optimized image
        fs.writeFileSync(imagePath, optimized);

        const newSize = fs.statSync(imagePath).size;
        const savedKB = ((originalSize - newSize) / 1024).toFixed(2);
        const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

        return {
            success: true,
            originalKB: (originalSize / 1024).toFixed(2),
            newKB: (newSize / 1024).toFixed(2),
            savedKB,
            savedPercent
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

async function main() {
    console.log('🔍 Scanning for large images...\n');

    const images = await getAllImages(IMAGES_DIR);
    images.sort((a, b) => b.sizeKB - a.sizeKB);

    console.log(`Found ${images.length} images larger than ${MIN_SIZE_KB}KB\n`);

    if (images.length === 0) {
        console.log('No images need optimization!');
        return;
    }

    console.log('🚀 Starting optimization...\n');
    console.log('='.repeat(80));

    let totalSavedKB = 0;
    let successCount = 0;

    for (const img of images) {
        const relativePath = path.relative(IMAGES_DIR, img.path);
        console.log(`\n📷 Processing: ${relativePath}`);
        console.log(`   Original: ${img.sizeMB} MB`);

        const result = await optimizeImage(img.path);

        if (result.success) {
            console.log(`   ✅ Optimized: ${result.originalKB}KB → ${result.newKB}KB (saved ${result.savedPercent}%)`);
            totalSavedKB += parseFloat(result.savedKB);
            successCount++;
        } else {
            console.log(`   ❌ Error: ${result.error}`);
        }
    }

    console.log('\n' + '='.repeat(80));
    console.log(`\n🎉 Optimization Complete!`);
    console.log(`   Images processed: ${successCount}/${images.length}`);
    console.log(`   Total space saved: ${(totalSavedKB / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
