# ระบบชำระเงินพร้อมแจ้งเตือน LINE

ระบบชำระเงินที่สมบูรณ์สำหรับ Thai Herb Center ประกอบด้วย:
- อัปโหลดสลิปการโอนเงิน
- ส่งแจ้งเตือนไปยัง LINE พร้อมสลิปและใบสั่งซื้อ
- สร้างใบสั่งซื้อสำหรับทีมแพ็คสินค้า

---

## Proposed Changes

### Backend - Orders API

#### [NEW] orders.js
สร้าง API endpoint สำหรับจัดการคำสั่งซื้อ:
- `POST /api/orders` - รับข้อมูลคำสั่งซื้อและสลิป
- ใช้ `multer` สำหรับอัปโหลดไฟล์สลิป
- Validate ข้อมูลลูกค้าและสินค้า
- สร้างเลขที่ใบสั่งซื้อ (Order ID)

#### [NEW] lineNotify.js
Service สำหรับส่งแจ้งเตือน LINE:
- ส่งข้อความสรุปคำสั่งซื้อ
- แนบรูปสลิปการโอนเงิน

#### [MODIFY] server.js
- เพิ่ม route `/api/orders`
- เพิ่ม static folder สำหรับเก็บไฟล์อัปโหลด

---

### Frontend - Checkout Enhancement

#### [MODIFY] Checkout.jsx
เพิ่มฟังก์ชันในหน้า checkout:
- **Slip Upload Component**: ช่องอัปโหลดรูปสลิป (เมื่อเลือก "โอนเงิน")
- **Preview**: แสดงตัวอย่างรูปสลิปก่อนส่ง
- **API Integration**: ส่งข้อมูลไป backend
- **Loading State**: แสดงสถานะกำลังส่ง
- **Success Modal**: แสดงยืนยันคำสั่งซื้อสำเร็จ

#### [MODIFY] Checkout.css
- เพิ่ม styles สำหรับ slip upload zone
- เพิ่ม styles สำหรับ image preview

---

## Data Flow

```
ลูกค้า กรอกข้อมูล + อัปโหลดสลิป
    ↓
Frontend ส่ง POST /api/orders (FormData)
    ↓
Backend บันทึกสลิป + สร้างใบสั่งซื้อ
    ↓
Backend ส่งแจ้งเตือน LINE (ข้อความ + สลิป)
    ↓
Frontend แสดงยืนยันสำเร็จ
```

---

## LINE Notify API

ใช้ LINE Notify API (ฟรี, ไม่จำกัดจำนวน):

**Endpoint**: `https://notify-api.line.me/api/notify`

**Headers**:
```
Authorization: Bearer {LINE_TOKEN}
Content-Type: multipart/form-data
```

**Parameters**:
- `message`: ข้อความแจ้งเตือน
- `imageFile`: ไฟล์รูปภาพ (สลิป)

---

## Verification Plan

### Manual Verification

1. สั่งซื้อสินค้าผ่านหน้าเว็บ
2. อัปโหลดสลิปการโอนเงิน
3. ตรวจสอบว่า LINE Notify ได้รับ:
   - ข้อความสรุปคำสั่งซื้อ
   - รูปสลิป
   - ข้อมูลที่อยู่จัดส่ง
