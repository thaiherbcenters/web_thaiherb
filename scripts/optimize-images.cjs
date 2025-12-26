const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1600; // Maximum width for images
const QUALITY = 80; // Quality for JPEG/WebP (0-100)

// Files larger than this will be optimized (500KB)
const SIZE_THRESHOLD = 500 * 1024;

async function getFilesRecursively(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files.push(...await getFilesRecursively(fullPath));
        } else if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(item.name)) {
            files.push(fullPath);
        }
    }
    return files;
}

async function optimizeImage(filePath) {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    // Skip if already small enough
    if (originalSize < SIZE_THRESHOLD) {
        return { skipped: true, path: filePath };
    }

    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, path.extname(filePath));
    const dir = path.dirname(filePath);

    // Create backup folder
    const backupDir = path.join(dir, '_backup');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    // Backup original
    const backupPath = path.join(backupDir, path.basename(filePath));
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
    }

    try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        let pipeline = image;

        // Resize if too wide
        if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Optimize based on format
        let outputPath = filePath;
        let newBuffer;

        if (ext === '.png') {
            newBuffer = await pipeline
                .png({ quality: QUALITY, compressionLevel: 9 })
                .toBuffer();
        } else {
            // For JPG/JPEG
            newBuffer = await pipeline
                .jpeg({ quality: QUALITY, mozjpeg: true })
                .toBuffer();
        }

        // Write optimized image
        fs.writeFileSync(outputPath, newBuffer);

        const newSize = newBuffer.length;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        return {
            path: filePath,
            originalSize: (originalSize / 1024 / 1024).toFixed(2) + ' MB',
            newSize: (newSize / 1024 / 1024).toFixed(2) + ' MB',
            savings: savings + '%'
        };
    } catch (error) {
        console.error(`Error optimizing ${filePath}:`, error.message);
        return { error: true, path: filePath, message: error.message };
    }
}

async function main() {
    console.log('🖼️  Image Optimization Script');
    console.log('============================\n');
    console.log(`Scanning: ${IMAGES_DIR}\n`);

    const files = await getFilesRecursively(IMAGES_DIR);
    console.log(`Found ${files.length} images\n`);

    let optimized = 0;
    let skipped = 0;
    let errors = 0;
    let totalSaved = 0;

    for (const file of files) {
        const result = await optimizeImage(file);

        if (result.skipped) {
            skipped++;
        } else if (result.error) {
            errors++;
            console.log(`❌ Error: ${path.basename(result.path)} - ${result.message}`);
        } else {
            optimized++;
            const originalMB = parseFloat(result.originalSize);
            const newMB = parseFloat(result.newSize);
            totalSaved += (originalMB - newMB);
            console.log(`✅ ${path.basename(result.path)}: ${result.originalSize} → ${result.newSize} (${result.savings} saved)`);
        }
    }

    console.log('\n============================');
    console.log(`📊 Summary:`);
    console.log(`   Optimized: ${optimized} files`);
    console.log(`   Skipped (already small): ${skipped} files`);
    console.log(`   Errors: ${errors} files`);
    console.log(`   Total saved: ${totalSaved.toFixed(2)} MB`);
    console.log('\n💡 Original files backed up to _backup folders');
}

main().catch(console.error);
