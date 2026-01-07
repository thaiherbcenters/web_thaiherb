import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import translations from '../translations';
import './Checkout.css';

// Use empty string for production (nginx proxies /api/ to backend)
// Use 'http://localhost:3001' for local development without nginx
const API_URL = '';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartSubtotal, clearCart } = useCart();
    const { language } = useTranslation();
    const fileInputRef = useRef(null);

    const subtotal = getCartSubtotal();
    const shippingCost = cartItems.length > 0 ? 50 : 0;
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

    const [slipFile, setSlipFile] = useState(null);
    const [slipPreview, setSlipPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [qrCodeData, setQrCodeData] = useState(null);
    const [qrLoading, setQrLoading] = useState(false);

    // Fetch PromptPay QR Code when total changes
    useEffect(() => {
        if (total > 0 && formData.paymentMethod === 'transfer') {
            setQrLoading(true);
            fetch(`${API_URL}/api/promptpay/qr?amount=${total}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setQrCodeData(data);
                    }
                })
                .catch(err => console.error('QR fetch error:', err))
                .finally(() => setQrLoading(false));
        }
    }, [total, formData.paymentMethod]);

    // Translation helper for product names
    // Thai: use database directly, EN/ZH: fallback to translations.js
    const getProductName = (productName) => {
        // For Thai language, always use the database value directly
        if (language === 'th') {
            return productName;
        }

        // For other languages, try to find translation in translations.js
        const items = translations?.products?.items;
        const trimmedName = productName?.trim();

        if (items && items[trimmedName] && items[trimmedName].name) {
            return items[trimmedName].name[language] || productName;
        }

        if (items) {
            for (const key of Object.keys(items)) {
                if (key.startsWith(trimmedName) || trimmedName.startsWith(key.split(' (')[0])) {
                    if (items[key].name) {
                        return items[key].name[language] || productName;
                    }
                }
            }
        }

        // Fallback to database value (Thai)
        return productName;
    };

    // Format price with currency conversion
    const formatPrice = (price) => {
        const priceNum = parseInt(price);
        if (language === 'th') {
            return `฿${priceNum.toLocaleString()}`;
        } else if (language === 'en') {
            return `฿${priceNum.toLocaleString()} (~$${(priceNum / 35).toFixed(2)})`;
        } else {
            return `฿${priceNum.toLocaleString()} (约¥${(priceNum / 5).toFixed(0)})`;
        }
    };

    // Translations
    const texts = {
        emptyCart: {
            title: { th: 'ยังไม่มีสินค้าในตะกร้า', en: 'No items in cart', zh: '购物车中没有商品' },
            subtitle: { th: 'กรุณาเลือกสินค้าก่อนดำเนินการชำระเงิน', en: 'Please select products before checkout', zh: '请先选择产品再结账' },
            button: { th: 'เลือกซื้อสินค้า', en: 'Shop Now', zh: '立即购物' }
        },
        header: {
            title: { th: 'ชำระเงิน', en: 'Checkout', zh: '结账' },
            subtitle: { th: 'กรุณากรอกข้อมูลสำหรับการจัดส่ง', en: 'Please fill in your shipping information', zh: '请填写您的收货信息' }
        },
        form: {
            customerInfo: { th: 'ข้อมูลผู้ซื้อ / ที่อยู่จัดส่ง', en: 'Customer Info / Shipping Address', zh: '买家信息 / 收货地址' },
            firstName: { th: 'ชื่อ', en: 'First Name', zh: '名' },
            firstNamePlaceholder: { th: 'ชื่อจริง', en: 'First name', zh: '名字' },
            lastName: { th: 'นามสกุล', en: 'Last Name', zh: '姓' },
            lastNamePlaceholder: { th: 'นามสกุล', en: 'Last name', zh: '姓氏' },
            phone: { th: 'เบอร์โทรศัพท์', en: 'Phone Number', zh: '电话号码' },
            phonePlaceholder: { th: '08x-xxx-xxxx', en: '08x-xxx-xxxx', zh: '08x-xxx-xxxx' },
            email: { th: 'อีเมล (ถ้ามี)', en: 'Email (optional)', zh: '电子邮件（可选）' },
            emailPlaceholder: { th: 'example@mail.com', en: 'example@mail.com', zh: 'example@mail.com' },
            address: { th: 'ที่อยู่', en: 'Address', zh: '地址' },
            addressPlaceholder: { th: 'บ้านเลขที่, หมู่, ซอย, ถนน', en: 'House number, village, street', zh: '门牌号、村庄、街道' },
            district: { th: 'เขต/อำเภอ', en: 'District', zh: '区/县' },
            province: { th: 'จังหวัด', en: 'Province', zh: '省份' },
            zipCode: { th: 'รหัสไปรษณีย์', en: 'Zip Code', zh: '邮政编码' }
        },
        payment: {
            title: { th: 'วิธีการชำระเงิน', en: 'Payment Method', zh: '支付方式' },
            transfer: { th: 'โอนเงินธนาคาร', en: 'Bank Transfer', zh: '银行转账' },
            transferDesc: { th: 'ชำระผ่าน Mobile Banking หรือ ตู้ ATM', en: 'Pay via Mobile Banking or ATM', zh: '通过手机银行或ATM支付' },
            cod: { th: 'เก็บเงินปลายทาง (COD)', en: 'Cash on Delivery (COD)', zh: '货到付款 (COD)' },
            codDesc: { th: 'ชำระเงินเมื่อได้รับสินค้า', en: 'Pay when you receive the product', zh: '收到货物时付款' },
            bankName: { th: 'ธนาคารกสิกรไทย (KBank)', en: 'Kasikorn Bank (KBank)', zh: '开泰银行 (KBank)' },
            accountName: { th: 'ชื่อบัญชี: วิสาหกิจชุมชนไทยเฮิร์บ', en: 'Account: Thai Herb Centers Community Enterprise', zh: '账户名：泰国草药中心社区企业' },
            accountNumber: { th: 'เลขที่บัญชี: 123-4-56789-0', en: 'Account No: 123-4-56789-0', zh: '账号：123-4-56789-0' }
        },
        slip: {
            title: { th: 'แนบสลิปการโอนเงิน', en: 'Attach Payment Slip', zh: '附上付款单据' },
            upload: { th: 'คลิกเพื่ออัปโหลดสลิป', en: 'Click to upload slip', zh: '点击上传付款单据' },
            hint: { th: 'รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 10MB', en: 'Supports JPG, PNG files up to 10MB', zh: '支持JPG、PNG文件，最大10MB' },
            required: { th: '*กรุณาแนบสลิปการโอนเงิน', en: '*Please attach payment slip', zh: '*请附上付款单据' }
        },
        note: {
            title: { th: 'หมายเหตุเพิ่มเติม', en: 'Additional Notes', zh: '备注' },
            placeholder: { th: 'แจ้งรายละเอียดเพิ่มเติมถึงทางร้าน...', en: 'Any additional information for the shop...', zh: '告诉商店任何其他信息...' }
        },
        summary: {
            title: { th: 'สรุปรายการสั่งซื้อ', en: 'Order Summary', zh: '订单摘要' },
            subtotal: { th: 'ยอดรวมสินค้า', en: 'Subtotal', zh: '商品小计' },
            shipping: { th: 'ค่าจัดส่ง', en: 'Shipping', zh: '运费' },
            total: { th: 'ยอดรวมสุทธิ', en: 'Total', zh: '总计' },
            confirmOrder: { th: 'ยืนยันการสั่งซื้อ', en: 'Confirm Order', zh: '确认订单' },
            processing: { th: 'กำลังดำเนินการ...', en: 'Processing...', zh: '处理中...' },
            securityNote: { th: '🔒 ข้อมูลของท่านจะถูกเก็บเป็นความลับ', en: '🔒 Your information is kept confidential', zh: '🔒 您的信息将被保密' },
            backToCart: { th: '← กลับไปหน้าตะกร้า', en: '← Back to Cart', zh: '← 返回购物车' }
        },
        success: {
            title: { th: 'สั่งซื้อสำเร็จ!', en: 'Order Placed!', zh: '订单成功!' },
            orderNumber: { th: 'หมายเลขคำสั่งซื้อ', en: 'Order Number', zh: '订单号' },
            message: { th: 'ขอบคุณสำหรับการสั่งซื้อ\nเราได้รับคำสั่งซื้อของคุณแล้ว\nและจะติดต่อกลับเร็วๆ นี้', en: 'Thank you for your order!\nWe have received your order\nand will contact you soon.', zh: '感谢您的订单！\n我们已收到您的订单\n将尽快与您联系。' },
            backHome: { th: 'กลับหน้าหลัก', en: 'Back to Home', zh: '返回首页' }
        },
        alerts: {
            emptyCart: { th: 'ตะกร้าสินค้าว่างเปล่า กรุณาเลือกสินค้าก่อน', en: 'Cart is empty. Please select products first', zh: '购物车为空，请先选择产品' },
            slipRequired: { th: 'กรุณาแนบสลิปการโอนเงิน', en: 'Please attach payment slip', zh: '请附上付款单据' },
            orderError: { th: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', en: 'An error occurred. Please try again.', zh: '发生错误，请重试。' }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
                return;
            }
            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                alert('ไฟล์ต้องมีขนาดไม่เกิน 10MB');
                return;
            }
            setSlipFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setSlipPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeSlip = () => {
        setSlipFile(null);
        setSlipPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert(texts.alerts.emptyCart[language]);
            navigate('/products');
            return;
        }

        // Validate slip for bank transfer
        if (formData.paymentMethod === 'transfer' && !slipFile) {
            alert(texts.alerts.slipRequired[language]);
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare order data
            const orderData = {
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                customer: formData,
                subtotal,
                shippingCost,
                total,
                paymentMethod: formData.paymentMethod
            };

            // Create FormData for file upload
            const formDataToSend = new FormData();
            formDataToSend.append('orderData', JSON.stringify(orderData));
            if (slipFile) {
                formDataToSend.append('slip', slipFile);
            }

            // Submit order
            const response = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();

            if (result.success) {
                // Google Ads Conversion Tracking
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                        'send_to': 'AW-17853208151/zxQGCJ3t9dwbENesicFC',
                        'value': total,
                        'currency': 'THB'
                    });
                }
                setOrderSuccess(result);
                clearCart();
            } else {
                throw new Error(result.error || 'Order failed');
            }
        } catch (error) {
            console.error('Order error:', error);
            alert(texts.alerts.orderError[language]);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success Modal
    if (orderSuccess) {
        return (
            <div className="checkout-page page">
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">✅</div>
                        <h2>{texts.success.title[language]}</h2>
                        <div className="order-id">
                            {texts.success.orderNumber[language]}: {orderSuccess.orderId}
                        </div>
                        <p>{texts.success.message[language]}</p>
                        <Link to="/" className="btn btn-primary">
                            {texts.success.backHome[language]}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Redirect if cart is empty
    if (cartItems.length === 0) {
        return (
            <div className="checkout-page page">
                <div className="container section">
                    <div className="empty-checkout">
                        <div className="empty-checkout-icon">🛒</div>
                        <h2>{texts.emptyCart.title[language]}</h2>
                        <p>{texts.emptyCart.subtitle[language]}</p>
                        <Link to="/products" className="btn btn-primary">
                            {texts.emptyCart.button[language]}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page page">
            <div className="checkout-header">
                <div className="container">
                    <h1>{texts.header.title[language]}</h1>
                    <p>{texts.header.subtitle[language]}</p>
                </div>
            </div>

            <div className="container checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>

                    {/* Left Column - Shipping & Info */}
                    <div className="checkout-details">

                        <div className="form-section">
                            <h3 className="section-title">{texts.form.customerInfo[language]}</h3>
                            <div className="form-grid">
                                <div className="form-group half">
                                    <label>{texts.form.firstName[language]}</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder={texts.form.firstNamePlaceholder[language]}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>{texts.form.lastName[language]}</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder={texts.form.lastNamePlaceholder[language]}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>{texts.form.phone[language]}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder={texts.form.phonePlaceholder[language]}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>{texts.form.email[language]}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={texts.form.emailPlaceholder[language]}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group full">
                                    <label>{texts.form.address[language]}</label>
                                    <textarea
                                        name="address"
                                        placeholder={texts.form.addressPlaceholder[language]}
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group half">
                                    <label>{texts.form.district[language]}</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>{texts.form.province[language]}</label>
                                    <input
                                        type="text"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group half">
                                    <label>{texts.form.zipCode[language]}</label>
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
                            <h3 className="section-title">{texts.payment.title[language]}</h3>
                            <div className="payment-method-info">
                                <div className="payment-method-badge">
                                    <span className="badge-icon">🏦</span>
                                    <span className="badge-text">{texts.payment.transfer[language]}</span>
                                </div>
                                <p className="payment-method-desc">{texts.payment.transferDesc[language]}</p>
                            </div>

                            {formData.paymentMethod === 'transfer' && (
                                <>
                                    {/* PromptPay QR Code Section */}
                                    <div className="promptpay-qr-section">
                                        <div className="qr-header">
                                            <img src="/promptpay-logo.png" alt="PromptPay" className="promptpay-logo" onError={(e) => e.target.style.display = 'none'} />
                                            <h4>PromptPay QR Code</h4>
                                        </div>

                                        {qrLoading ? (
                                            <div className="qr-loading">
                                                <div className="spinner"></div>
                                                <p>กำลังสร้าง QR Code...</p>
                                            </div>
                                        ) : qrCodeData ? (
                                            <div className="qr-content">
                                                <img
                                                    src={qrCodeData.qrCode}
                                                    alt="PromptPay QR"
                                                    className="qr-image"
                                                />
                                                <div className="qr-amount">
                                                    <span>ยอดชำระ</span>
                                                    <strong>฿{total.toLocaleString()}</strong>
                                                </div>
                                                <p className="qr-promptpay-id">
                                                    PromptPay: {qrCodeData.promptpayId}
                                                </p>
                                                <p className="qr-instruction">
                                                    📱 สแกน QR ด้วยแอปธนาคาร แล้วแนบสลิปด้านล่าง
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="qr-error">
                                                <p>ไม่สามารถสร้าง QR Code ได้</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bank-info-box">
                                        <p><strong>{texts.payment.bankName[language]}</strong></p>
                                        <p>{texts.payment.accountName[language]}</p>
                                        <p className="acc-number">{texts.payment.accountNumber[language]}</p>
                                    </div>

                                    {/* Slip Upload Section */}
                                    <div className="slip-upload-section">
                                        <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>
                                            {texts.slip.title[language]} <span style={{ color: '#d32f2f' }}>*</span>
                                        </h4>

                                        <div
                                            className={`slip-upload-zone ${slipFile ? 'has-file' : ''}`}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <div className="upload-icon">📤</div>
                                            <p className="upload-text">{texts.slip.upload[language]}</p>
                                            <p className="upload-hint">{texts.slip.hint[language]}</p>
                                        </div>

                                        {slipPreview && (
                                            <div className="slip-preview">
                                                <img src={slipPreview} alt="Payment slip preview" />
                                                <button
                                                    type="button"
                                                    className="remove-slip-btn"
                                                    onClick={removeSlip}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}

                                        {!slipFile && (
                                            <p style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                                {texts.slip.required[language]}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="form-section">
                            <h3 className="section-title">{texts.note.title[language]}</h3>
                            <div className="form-group full">
                                <textarea
                                    name="note"
                                    placeholder={texts.note.placeholder[language]}
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
                            <h3>{texts.summary.title[language]}</h3>

                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <div className="item-image">
                                            {item.icon && item.icon.startsWith('/') ? (
                                                <img src={item.icon} alt={getProductName(item.name)} />
                                            ) : (
                                                <span className="item-emoji">{item.icon || '🌿'}</span>
                                            )}
                                            <span className="item-qty">{item.quantity}</span>
                                        </div>
                                        <div className="item-info">
                                            <p className="item-name">{getProductName(item.name)}</p>
                                            <p className="item-price">{formatPrice(item.price)} x {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-totals">
                                <div className="row">
                                    <span>{texts.summary.subtotal[language]}</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="row">
                                    <span>{texts.summary.shipping[language]}</span>
                                    <span>{formatPrice(shippingCost)}</span>
                                </div>
                                <div className="divider"></div>
                                <div className="row total">
                                    <span>{texts.summary.total[language]}</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn-place-order ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting || (formData.paymentMethod === 'transfer' && !slipFile)}
                            >
                                {isSubmitting ? texts.summary.processing[language] : texts.summary.confirmOrder[language]}
                            </button>

                            <p className="security-note">
                                {texts.summary.securityNote[language]}
                            </p>

                            <Link to="/cart" className="back-link">
                                {texts.summary.backToCart[language]}
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Checkout;
