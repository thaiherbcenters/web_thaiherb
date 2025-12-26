import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import translations from '../translations';
import './Cart.css';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartSubtotal, clearCart } = useCart();
    const { language } = useTranslation();

    const subtotal = getCartSubtotal();
    const shippingCost = cartItems.length > 0 ? 50 : 0;
    const total = subtotal + shippingCost;

    // Translation helper for product names
    const getProductName = (productName) => {
        const items = translations?.products?.items;
        const trimmedName = productName?.trim();

        // Try exact match first
        if (items && items[trimmedName] && items[trimmedName].name) {
            return items[trimmedName].name[language] || items[trimmedName].name['th'] || trimmedName;
        }

        // Try partial match - find key that starts with trimmedName or contains it
        if (items) {
            for (const key of Object.keys(items)) {
                if (key.startsWith(trimmedName) || trimmedName.startsWith(key.split(' (')[0])) {
                    if (items[key].name) {
                        return items[key].name[language] || items[key].name['th'] || trimmedName;
                    }
                }
            }
        }

        return trimmedName || productName;
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
            title: {
                th: 'ตะกร้าของคุณว่างเปล่า',
                en: 'Your cart is empty',
                zh: '您的购物车为空'
            },
            subtitle: {
                th: 'เลือกสินค้าที่คุณต้องการแล้วเพิ่มลงตะกร้า',
                en: 'Select products you want and add them to your cart',
                zh: '选择您想要的产品并添加到购物车'
            },
            button: {
                th: 'เลือกซื้อสินค้า',
                en: 'Shop Now',
                zh: '立即购物'
            }
        },
        hero: {
            badge: {
                th: 'ตะกร้าสินค้า',
                en: 'Shopping Cart',
                zh: '购物车'
            },
            title1: {
                th: 'ตะกร้า',
                en: 'Your',
                zh: '您的'
            },
            title2: {
                th: 'ของคุณ',
                en: 'Cart',
                zh: '购物车'
            },
            itemCount: {
                th: (count) => `มี ${count} รายการในตะกร้า`,
                en: (count) => `${count} item${count > 1 ? 's' : ''} in cart`,
                zh: (count) => `购物车中有 ${count} 件商品`
            }
        },
        header: {
            product: { th: 'สินค้า', en: 'Product', zh: '产品' },
            price: { th: 'ราคา', en: 'Price', zh: '价格' },
            quantity: { th: 'จำนวน', en: 'Quantity', zh: '数量' },
            total: { th: 'รวม', en: 'Total', zh: '小计' }
        },
        actions: {
            continueShopping: {
                th: '← เลือกซื้อสินค้าต่อ',
                en: '← Continue Shopping',
                zh: '← 继续购物'
            },
            clearCart: {
                th: '🗑️ ล้างตะกร้า',
                en: '🗑️ Clear Cart',
                zh: '🗑️ 清空购物车'
            },
            clearConfirm: {
                th: 'ต้องการล้างตะกร้าทั้งหมดหรือไม่?',
                en: 'Are you sure you want to clear your cart?',
                zh: '您确定要清空购物车吗？'
            },
            removeItem: {
                th: 'ลบสินค้า',
                en: 'Remove item',
                zh: '删除商品'
            }
        },
        summary: {
            title: {
                th: 'สรุปคำสั่งซื้อ',
                en: 'Order Summary',
                zh: '订单摘要'
            },
            subtotal: {
                th: 'ยอดรวมสินค้า',
                en: 'Subtotal',
                zh: '商品小计'
            },
            shipping: {
                th: 'ค่าจัดส่ง',
                en: 'Shipping',
                zh: '运费'
            },
            total: {
                th: 'ยอดรวมทั้งหมด',
                en: 'Total',
                zh: '总计'
            },
            checkout: {
                th: 'ดำเนินการสั่งซื้อ →',
                en: 'Proceed to Checkout →',
                zh: '去结算 →'
            },
            securePayment: {
                th: '🔒 การชำระเงินปลอดภัย',
                en: '🔒 Secure Payment',
                zh: '🔒 安全支付'
            }
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page page">
                <div className="container section">
                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
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
        <div className="cart-page page">
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge slide-text slide-0">{texts.hero.badge[language]}</span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        {texts.hero.title1[language]}<span className="text-blue">{texts.hero.title2[language]}</span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {texts.hero.itemCount[language](cartItems.length)}
                    </p>
                </div>
            </section>

            <div className="container section">
                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items-section">
                        <div className="cart-header-row">
                            <span>{texts.header.product[language]}</span>
                            <span>{texts.header.price[language]}</span>
                            <span>{texts.header.quantity[language]}</span>
                            <span>{texts.header.total[language]}</span>
                            <span></span>
                        </div>

                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-product">
                                    <div className="cart-item-image">
                                        {item.icon && item.icon.startsWith('/') ? (
                                            <img src={item.icon} alt={getProductName(item.name)} />
                                        ) : (
                                            <span className="cart-item-emoji">{item.icon || '🌿'}</span>
                                        )}
                                    </div>
                                    <div className="cart-item-info">
                                        <Link to={`/products/${item.id}`} className="cart-item-name">
                                            {getProductName(item.name)}
                                        </Link>
                                    </div>
                                </div>

                                <div className="cart-item-price">
                                    {formatPrice(item.price)}
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        −
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    {formatPrice(item.price * item.quantity)}
                                </div>

                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    title={texts.actions.removeItem[language]}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <div className="cart-actions">
                            <Link to="/products" className="btn btn-outline">
                                {texts.actions.continueShopping[language]}
                            </Link>
                            <button
                                className="btn btn-outline btn-danger"
                                onClick={() => {
                                    if (window.confirm(texts.actions.clearConfirm[language])) {
                                        clearCart();
                                    }
                                }}
                            >
                                {texts.actions.clearCart[language]}
                            </button>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary-section">
                        <div className="cart-summary-card">
                            <h3>{texts.summary.title[language]}</h3>

                            <div className="summary-row">
                                <span>{texts.summary.subtotal[language]}</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div className="summary-row">
                                <span>{texts.summary.shipping[language]}</span>
                                <span>{formatPrice(shippingCost)}</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row total">
                                <span>{texts.summary.total[language]}</span>
                                <span>{formatPrice(total)}</span>
                            </div>

                            <Link to="/checkout" className="btn btn-primary btn-checkout">
                                {texts.summary.checkout[language]}
                            </Link>

                            <p className="summary-note">
                                {texts.summary.securePayment[language]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
