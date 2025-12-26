/**
 * Test LINE Messaging API
 */
require('dotenv').config();
const { sendPushMessage } = require('./services/lineNotify');

async function test() {
    console.log('Testing LINE Push Message...');
    console.log('Token:', process.env.LINE_CHANNEL_ACCESS_TOKEN?.substring(0, 20) + '...');
    console.log('User ID:', process.env.LINE_USER_ID);

    try {
        await sendPushMessage('🎉 ทดสอบจาก Thai Herb Center!\n\nระบบแจ้งเตือน LINE ทำงานเรียบร้อย ✅');
        console.log('✅ Message sent successfully!');
    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
    }
}

test();
