/**
 * PromptPay QR Code API
 * สร้าง QR Code สำหรับชำระเงินผ่าน PromptPay
 */

const express = require('express');
const router = express.Router();
const generatePayload = require('promptpay-qr');
const QRCode = require('qrcode');

// PromptPay ID (เบอร์มือถือ)
const PROMPTPAY_ID = '0618208026';

/**
 * GET /api/promptpay/qr
 * สร้าง QR Code PromptPay
 * Query params:
 *   - amount: จำนวนเงิน (required)
 */
router.get('/qr', async (req, res) => {
    try {
        const amount = parseFloat(req.query.amount);

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid amount'
            });
        }

        // สร้าง PromptPay payload
        const payload = generatePayload(PROMPTPAY_ID, { amount });

        // สร้าง QR Code เป็น Data URL
        const qrCodeDataUrl = await QRCode.toDataURL(payload, {
            errorCorrectionLevel: 'M',
            type: 'image/png',
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        res.json({
            success: true,
            qrCode: qrCodeDataUrl,
            amount,
            promptpayId: PROMPTPAY_ID.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        });

    } catch (error) {
        console.error('PromptPay QR error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/promptpay/info
 * ดึงข้อมูล PromptPay
 */
router.get('/info', (req, res) => {
    res.json({
        success: true,
        promptpayId: PROMPTPAY_ID.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
        accountName: 'วิสาหกิจชุมชนไทยเฮิร์บ'
    });
});

module.exports = router;
