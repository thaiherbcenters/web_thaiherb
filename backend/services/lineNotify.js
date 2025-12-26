/**
 * LINE Messaging API Service with Cloudinary Image Support
 * ส่งแจ้งเตือนคำสั่งซื้อไปยัง LINE พร้อมรูปสลิป
 */

const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message/push';

// Cloudinary will auto-configure from CLOUDINARY_URL environment variable
// No manual config needed - it reads CLOUDINARY_URL automatically

/**
 * อัปโหลดรูปไปยัง Cloudinary
 * @param {string} filePath - path ของไฟล์ในเครื่อง
 * @returns {Promise<string>} - URL ของรูปที่อัปโหลด
 */
async function uploadToCloudinary(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'thaiherb-slips',
            resource_type: 'image'
        });
        console.log('Cloudinary upload success:', result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error.message);
        throw error;
    }
}

/**
 * ส่งข้อความ Push ไปยัง LINE
 * @param {string} message - ข้อความที่จะส่ง
 */
async function sendPushMessage(message) {
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const userId = process.env.LINE_USER_ID;

    if (!token || !userId) {
        console.error('LINE_CHANNEL_ACCESS_TOKEN or LINE_USER_ID is not set');
        throw new Error('LINE configuration not complete');
    }

    try {
        const response = await axios.post(LINE_MESSAGING_API, {
            to: userId,
            messages: [
                {
                    type: 'text',
                    text: message
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('LINE Push message sent successfully');
        return response.data;
    } catch (error) {
        console.error('LINE Messaging API error:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * ส่งรูปภาพไปยัง LINE
 * @param {string} imageUrl - URL ของรูปภาพ (ต้องเป็น https://)
 */
async function sendImageMessage(imageUrl) {
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const userId = process.env.LINE_USER_ID;

    if (!token || !userId) {
        throw new Error('LINE configuration not complete');
    }

    try {
        const response = await axios.post(LINE_MESSAGING_API, {
            to: userId,
            messages: [
                {
                    type: 'image',
                    originalContentUrl: imageUrl,
                    previewImageUrl: imageUrl
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('LINE Image sent successfully');
        return response.data;
    } catch (error) {
        console.error('LINE Image send error:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * ส่งแจ้งเตือนคำสั่งซื้อใหม่พร้อมรูปสลิป
 * @param {Object} order - ข้อมูลคำสั่งซื้อ
 * @param {string} slipPath - path ของสลิปการโอนเงิน (local file)
 */
async function sendOrderNotification(order, slipPath = null) {
    const { orderId, customer, items, subtotal, shippingCost, total, paymentMethod, orderDate } = order;

    // สร้างรายการสินค้า
    const itemsList = items.map(item =>
        `• ${item.name} x${item.quantity} = ฿${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    // สร้างข้อความแจ้งเตือน
    const message = `🛒 คำสั่งซื้อใหม่ #${orderId}
━━━━━━━━━━━━━━━━━━

👤 ลูกค้า: ${customer.firstName} ${customer.lastName}
📞 โทร: ${customer.phone}
${customer.email ? `📧 Email: ${customer.email}` : ''}

📍 ที่อยู่จัดส่ง:
${customer.address}
${customer.district}, ${customer.province} ${customer.zipCode}

📦 รายการสินค้า:
${itemsList}

━━━━━━━━━━━━━━━━━━
💰 ยอดสินค้า: ฿${subtotal.toLocaleString()}
🚚 ค่าจัดส่ง: ฿${shippingCost.toLocaleString()}
💵 รวมทั้งหมด: ฿${total.toLocaleString()}

💳 ชำระ: ${paymentMethod === 'transfer' ? 'โอนเงิน ✅' : 'เก็บเงินปลายทาง'}
${customer.note ? `📝 หมายเหตุ: ${customer.note}` : ''}

⏰ ${new Date(orderDate).toLocaleString('th-TH')}`;

    // ส่งข้อความแจ้งเตือน
    await sendPushMessage(message);

    // ส่งรูปสลิปถ้ามี
    if (slipPath && fs.existsSync(slipPath)) {
        try {
            // อัปโหลดไป Cloudinary
            const imageUrl = await uploadToCloudinary(slipPath);

            // ส่งรูปไป LINE
            await sendImageMessage(imageUrl);

            console.log('Slip image sent to LINE successfully');
        } catch (error) {
            console.error('Failed to send slip image:', error.message);
            // ส่งข้อความแจ้งว่ามีปัญหากับรูป
            await sendPushMessage(`⚠️ ไม่สามารถส่งรูปสลิป #${orderId} ได้ กรุณาตรวจสอบในระบบ`);
        }
    }

    return { success: true, orderId };
}

module.exports = {
    uploadToCloudinary,
    sendPushMessage,
    sendImageMessage,
    sendOrderNotification
};
