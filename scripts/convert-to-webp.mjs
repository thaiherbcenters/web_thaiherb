import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');

// Images to convert with quality 95% (lossy - visually identical)
const LOSSY_FILES = [
  'images/service-oem.png',
  'images/service-oem1.png',
  'images/service-registration.png',
  'images/service-products.png',
  'images/service-training.jpg',
  'images/ceo_award.png',
  'images/certifications-banner.png',
  'images/oem-consult.png',
  'images/oem-register.png',
  'images/oem-register1.png',
  'images/oem-training.png',
  'images/oem-formula.JPG',
  'images/oem-formula1.JPG',
  'images/oem-packaging.jpg',
  'images/oem-packaging1.JPG',
  'images/standards.png',
  'images/standards_1.JPG',
  'images/standards_2.JPG',
  'images/standards_3.png',
  'images/certificate_1.png',
  'images/certificate_2.png',
  'images/certificate_3.png',
  'images/certificate_4.png',
  'images/popup/popup-ad.png',
  'images/popup/popup-ad-mobile.png',
  'hero-bg-5.png',
];

// Logo images - use lossless WebP (no quality loss at all)
const LOSSLESS_FILES = [
  'images/gmp_logo.png',
  'images/green_industry_logo.png',
  'images/halal_logo.png',
  'images/iso14001_logo.png',
  'images/iso9001_logo.png',
  'images/mit_logo.png',
  'images/otop_logo.png',
  'images/php_logo.png',
  'images/tls_logo.png',
  'images/ttm_logo.png',
  'logo-icon.png',
  'favicon.png',
  'hero-logo.png',
];

async function convertFile(relPath, lossless = false) {
  const inputPath = path.join(PUBLIC, relPath);
  if (!fs.existsSync(inputPath)) {
    console.log(`  ⚠ SKIP (not found): ${relPath}`);
    return;
  }

  const ext = path.extname(relPath);
  const outputPath = inputPath.replace(ext, '.webp');

  try {
    const inputStats = fs.statSync(inputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(0);

    if (lossless) {
      await sharp(inputPath)
        .webp({ lossless: true })
        .toFile(outputPath);
    } else {
      await sharp(inputPath)
        .webp({ quality: 95, effort: 6 })
        .toFile(outputPath);
    }

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(0);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(0);

    console.log(`  ✅ ${relPath}: ${inputSizeKB} KB → ${outputSizeKB} KB (${reduction}% smaller) ${lossless ? '[lossless]' : '[q95]'}`);
  } catch (err) {
    console.log(`  ❌ ERROR: ${relPath} - ${err.message}`);
  }
}

async function main() {
  console.log('\n🔄 Converting images to WebP...\n');
  console.log('--- Lossy (quality 95%) ---');
  for (const f of LOSSY_FILES) {
    await convertFile(f, false);
  }

  console.log('\n--- Lossless (no quality loss) ---');
  for (const f of LOSSLESS_FILES) {
    await convertFile(f, true);
  }

  console.log('\n✅ Done! Original files are kept.\n');
}

main();
