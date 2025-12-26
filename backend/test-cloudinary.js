/**
 * Test Cloudinary Configuration
 */
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

console.log('=== Cloudinary Config Test ===');
console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL);

// Check current config
console.log('\nCurrent Cloudinary Config:');
console.log(cloudinary.config());

// Try a simple test upload
async function testUpload() {
    try {
        // Upload a test image from URL
        const result = await cloudinary.uploader.upload(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
            {
                folder: 'test',
                public_id: 'test-image-' + Date.now()
            }
        );
        console.log('\n✅ Upload SUCCESS!');
        console.log('URL:', result.secure_url);
    } catch (error) {
        console.log('\n❌ Upload FAILED!');
        console.log('Error:', error.message);
        console.log('Full error:', JSON.stringify(error, null, 2));
    }
}

testUpload();
