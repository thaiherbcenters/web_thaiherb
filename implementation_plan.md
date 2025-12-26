# ระบบชำระเงินสำหรับ Thai Herb Center

## ภาพรวม
สร้างระบบชำระเงินที่สมบูรณ์ตามมาตรฐานสากล พร้อมการแจ้งเตือนผ่าน LINE หลังจากมีออเดอร์ใหม่

---

## User Review Required

> [!IMPORTANT]
> **LINE Notify Token:** คุณต้องสร้าง LINE Notify Token เพื่อให้ระบบส่งการแจ้งเตือนได้
> 1. ไปที่ https://notify-bot.line.me/th/
> 2. Login แล้วไปที่ "หน้าของฉัน"
> 3. เลือก "สร้าง Token" → ใส่ชื่อ "Thai Herb Orders" → เลือก "1-on-1 chat" (หรือกลุ่มที่ต้องการ)
> 4. Copy Token แล้วส่งให้ผม หรือใส่ใน `.env` เอง

> [!WARNING]
> **LINE ID ที่ให้มา (0987417783)** ไม่ใช่รูปแบบที่ใช้กับ LINE Notify API ได้โดยตรง
> - LINE Notify ใช้ Token เพื่อส่งข้อความไปที่บัญชีที่สร้าง Token
> - หากต้องการส่งไปหาเบอร์/ID เฉพาะ ต้องใช้ LINE Messaging API ซึ่งซับซ้อนกว่า

---

## Proposed Changes

### Backend - Order Processing System

#### [NEW] [orders.js](file:///c:/test_ai/thaiherb/backend/routes/orders.js)
- API สำหรับรับออเดอร์ใหม่ `POST /api/orders`
- รับข้อมูลลูกค้า, รายการสินค้า, วิธีชำระเงิน
- รองรับ multipart/form-data สำหรับ upload สลิป
- สร้างเลขออเดอร์ unique (format: `THC-YYYYMMDD-XXXX`)
- บันทึกลง PostgreSQL
- เรียก LINE Notify เพื่อแจ้งเตือน

#### [NEW] [lineNotify.js](file:///c:/test_ai/thaiherb/backend/services/lineNotify.js)
- Service สำหรับส่งข้อความ/รูปไป LINE Notify
- ฟังก์ชัน: `sendOrderNotification(order, slipImage)`
- สร้างข้อความแสดงรายละเอียดออเดอร์
- ส่งภาพสลิปพร้อมข้อความ

#### [MODIFY] [server.js](file:///c:/test_ai/thaiherb/backend/server.js)
- เพิ่ม route `/api/orders`
- เพิ่ม static file serving สำหรับ uploads

#### [MODIFY] [.env](file:///c:/test_ai/thaiherb/backend/.env)
- เพิ่ม `LINE_NOTIFY_TOKEN`

---

### Database - Orders Table

#### [NEW] [init-orders.js](file:///c:/test_ai/thaiherb/backend/scripts/init-orders.js)
สร้างตาราง `orders`:
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    shipping_address TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    payment_slip_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'pending',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Frontend - Checkout Enhancement

#### [MODIFY] [Checkout.jsx](file:///c:/test_ai/thaiherb/src/pages/Checkout.jsx)
- เพิ่มฟอร์ม upload สลิป (เมื่อเลือกโอนเงิน)
- เพิ่ม preview รูปสลิปก่อน submit
- เรียก API `/api/orders` แทน console.log
- เพิ่ม loading state ระหว่างประมวลผล
- Handle errors อย่างเหมาะสม

#### [NEW] [OrderSuccess.jsx](file:///c:/test_ai/thaiherb/src/pages/OrderSuccess.jsx)
- หน้าแสดงยืนยันคำสั่งซื้อสำเร็จ
- แสดงเลขออเดอร์
- แสดงสรุปรายการ
- แสดงข้อมูลบัญชีธนาคาร (ถ้าชำระโอน)

#### [MODIFY] [App.jsx](file:///c:/test_ai/thaiherb/src/App.jsx)
- เพิ่ม route `/order-success`

---

## Verification Plan

### Manual Testing
1. **เริ่มต้น Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **เริ่มต้น Frontend:**
   ```bash
   npm run dev
   ```

3. **ทดสอบ Flow:**
   - เพิ่มสินค้าลงตะกร้า
   - ไปหน้า Checkout
   - กรอกข้อมูลผู้ซื้อ
   - เลือก "โอนเงิน" และ upload สลิป
   - กดยืนยันคำสั่งซื้อ
   - ตรวจสอบหน้า Order Success
   - ตรวจสอบข้อความแจ้งเตือนใน LINE

4. **ตรวจสอบ Database:**
   ```bash
   cd backend
   node test-connection.js
   ```
   หรือ query ตรง:
   ```sql
   SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
   ```
