/**
 * Orders API Routes
 * จัดการคำสั่งซื้อและการชำระเงิน
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendOrderNotification } = require('../services/lineNotify');

// สร้างโฟลเดอร์เก็บไฟล์อัปโหลด
const uploadDir = path.join(__dirname, '../uploads/slips');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่า multer สำหรับอัปโหลดสลิป
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `slip-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed'));
    }
});

// สร้างเลขที่คำสั่งซื้อ
function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TH${year}${month}${day}-${random}`;
}

/**
 * POST /api/orders
 * สร้างคำสั่งซื้อใหม่
 */
router.post('/', upload.single('slip'), async (req, res) => {
    try {
        // รับข้อมูลจาก request
        const orderData = JSON.parse(req.body.orderData);
        const { customer, items, subtotal, shippingCost, total, paymentMethod } = orderData;

        // Validate ข้อมูล
        if (!customer || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Missing required order data'
            });
        }

        // ต้องมีสลิปถ้าเลือกโอนเงิน
        if (paymentMethod === 'transfer' && !req.file) {
            return res.status(400).json({
                success: false,
                error: 'Payment slip is required for bank transfer'
            });
        }

        // สร้างคำสั่งซื้อ
        const orderId = generateOrderId();
        const order = {
            orderId,
            customer,
            items,
            subtotal,
            shippingCost,
            total,
            paymentMethod,
            orderDate: new Date().toISOString(),
            slipPath: req.file ? req.file.path : null
        };

        console.log('New order created:', orderId);

        // ส่งแจ้งเตือน LINE
        try {
            await sendOrderNotification(order, order.slipPath);
            console.log('LINE notification sent for order:', orderId);
        } catch (lineError) {
            console.error('Failed to send LINE notification:', lineError.message);
            // ไม่ให้ error นี้ทำให้ order ล้มเหลว
        }

        // ส่ง response
        res.json({
            success: true,
            orderId,
            message: 'Order created successfully',
            order: {
                orderId,
                total,
                paymentMethod,
                orderDate: order.orderDate
            }
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create order'
        });
    }
});

/**
 * GET /api/orders/health
 * Health check สำหรับ orders API
 */
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Orders API is running'
    });
});

module.exports = router;
