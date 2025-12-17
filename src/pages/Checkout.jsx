import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    // Mock cart data
    const cartItems = [
        {
            id: 1,
            name: 'ยาดมสมุนไพรตราโป๊ยเซียน',
            price: 25,
            quantity: 2,
            image: 'https://placehold.co/100x100?text=Inhaler'
        },
        {
            id: 2,
            name: 'ฟ้าทะลายโจรแคปซูล',
            price: 150,
            quantity: 1,
            image: 'https://placehold.co/100x100?text=FaTalaiJone'
        }
    ];

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const shippingCost = 50;
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingCost;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        district: '',
        province: '',
        zipCode: '',
        note: '',
        paymentMethod: 'transfer'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('นี่เป็นเพียงแบบร่าง (Draft) ยังไม่มีระบบหลังบ้าน\n\nข้อมูลที่กรอก:\n' + JSON.stringify(formData, null, 2));
    };

    return (
        <div className="checkout-page page">
            <div className="checkout-header">
                <div className="container">
                    <h1>ชำระเงิน</h1>
                    <p>กรุณากรอกข้อมูลสำหรับการจัดส่ง</p>
                </div>
            </div>

            <div className="container checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>

                    {/* Left Column - Shipping & Info */}
                    <div className="checkout-details">

                        <div className="form-section">
                            <h3 className="section-title">ข้อมูลผู้ซื้อ / ที่อยู่จัดส่ง</h3>
                            <div className="form-grid">
                                <div className="form-group half">
                                    <label>ชื่อ</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="ชื่อจริง"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>นามสกุล</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="นามสกุล"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>เบอร์โทรศัพท์</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="08x-xxx-xxxx"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>อีเมล (ถ้ามี)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group full">
                                    <label>ที่อยู่</label>
                                    <textarea
                                        name="address"
                                        placeholder="บ้านเลขที่, หมู่, ซอย, ถนน"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group half">
                                    <label>เขต/อำเภอ</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>จังหวัด</label>
                                    <input
                                        type="text"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>รหัสไปรษณีย์</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3 className="section-title">วิธีการชำระเงิน</h3>
                            <div className="payment-options">
                                <label className={`payment-option ${formData.paymentMethod === 'transfer' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="transfer"
                                        checked={formData.paymentMethod === 'transfer'}
                                        onChange={handleChange}
                                    />
                                    <div className="option-content">
                                        <span className="option-title">โอนเงินธนาคาร</span>
                                        <span className="option-desc">ชำระผ่าน Mobile Banking หรือ ตู้ ATM</span>
                                    </div>
                                    <span className="check-icon">✓</span>
                                </label>
                                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                    />
                                    <div className="option-content">
                                        <span className="option-title">เก็บเงินปลายทาง (COD)</span>
                                        <span className="option-desc">ชำระเงินเมื่อได้รับสินค้า</span>
                                    </div>
                                    <span className="check-icon">✓</span>
                                </label>
                            </div>

                            {formData.paymentMethod === 'transfer' && (
                                <div className="bank-info-box">
                                    <p><strong>ธนาคารกสิกรไทย (KBank)</strong></p>
                                    <p>ชื่อบัญชี: วิสาหกิจชุมชนไทยเฮิร์บ</p>
                                    <p className="acc-number">เลขที่บัญชี: 123-4-56789-0</p>
                                    <p className="note">*กรุณาแนบสลิปหลังจากกดสั่งซื้อ</p>
                                </div>
                            )}
                        </div>

                        <div className="form-section">
                            <h3 className="section-title">หมายเหตุเพิ่มเติม</h3>
                            <div className="form-group full">
                                <textarea
                                    name="note"
                                    placeholder="แจ้งรายละเอียดเพิ่มเติมถึงทางร้าน..."
                                    rows="2"
                                    value={formData.note}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="checkout-summary">
                        <div className="summary-card">
                            <h3>สรุปรายการสั่งซื้อ</h3>

                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                            <span className="item-qty">{item.quantity}</span>
                                        </div>
                                        <div className="item-info">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-price">฿{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-totals">
                                <div className="row">
                                    <span>ยอดรวมสินค้า</span>
                                    <span>฿{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="row">
                                    <span>ค่าจัดส่ง</span>
                                    <span>฿{shippingCost.toLocaleString()}</span>
                                </div>
                                <div className="divider"></div>
                                <div className="row total">
                                    <span>ยอดรวมสุทธิ</span>
                                    <span>฿{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button type="submit" className="btn-place-order">
                                ยืนยันการสั่งซื้อ
                            </button>

                            <p className="security-note">
                                🔒 ข้อมูลของท่านจะถูกเก็บเป็นความลับ
                            </p>

                            <Link to="/products" className="back-link">
                                ← ซื้อสินค้าต่อ
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Checkout;
