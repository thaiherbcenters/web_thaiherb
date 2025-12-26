import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import translations from '../translations';
import api from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { t, language } = useTranslation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    // Translation helper for categories
    const getCategoryDisplay = (category) => {
        const categoryMap = {
            'ทั้งหมด': 'all',
            'ยาแคปซูล': 'capsule',
            'ยาหม่อง': 'balm',
            'ยาน้ำมันนวด': 'massageOil',
            'ยาดม': 'inhaler',
            'ยาดองสมุนไพร': 'herbalWine',
            'น้ำผึ้ง': 'honey',
            'เทียนหอม': 'candle',
            'ชาสมุนไพร': 'herbalTea',
            'ไม้หอม': 'diffuser',
            'ลูกประคบสมุนไพร': 'compressBall'
        };
        const key = categoryMap[category];
        if (key) {
            return t(`products.categories.${key}`);
        }
        return category;
    };

    // Translation helper for tags
    const getTagDisplay = (tag) => {
        const tagMap = {
            'ขายดี': 'bestSeller',
            'แนะนำ': 'recommended',
            'ใหม่': 'new'
        };
        const key = tagMap[tag];
        if (key) {
            return t(`products.tags.${key}`);
        }
        return tag;
    };

    // Translation helper for product names
    const getProductName = (productName) => {
        const items = translations?.products?.items;
        const trimmedName = productName?.trim();

        // Try exact match first
        if (items && items[trimmedName] && items[trimmedName].name) {
            return items[trimmedName].name[language] || items[trimmedName].name['th'] || trimmedName;
        }

        // Try partial match
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

    // Translation helper for product descriptions
    const getProductDesc = (productName, originalDesc) => {
        const items = translations?.products?.items;
        const trimmedName = productName?.trim();

        // Try exact match first
        if (items && items[trimmedName] && items[trimmedName].desc) {
            return items[trimmedName].desc[language] || items[trimmedName].desc['th'] || originalDesc;
        }

        // Try partial match
        if (items) {
            for (const key of Object.keys(items)) {
                if (key.startsWith(trimmedName) || trimmedName.startsWith(key.split(' (')[0])) {
                    if (items[key].desc) {
                        return items[key].desc[language] || items[key].desc['th'] || originalDesc;
                    }
                }
            }
        }

        return originalDesc;
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

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await api.getProductById(id);
                if (data) {
                    setProduct(data);
                    setError(null);
                } else {
                    setError(language === 'th' ? 'ไม่พบสินค้านี้'
                        : language === 'en' ? 'Product not found'
                            : '找不到此产品');
                }
            } catch (err) {
                console.error('Error loading product:', err);
                setError(language === 'th' ? 'เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า'
                    : language === 'en' ? 'Error loading product data'
                        : '加载产品数据时出错');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, language]);

    // Helper to get color class for category
    const getCategoryClass = (category) => {
        if (!category) return '';
        if (['ยาแคปซูล', 'ยาดองสมุนไพร'].includes(category)) return 'cat-medicine';
        if (['ยาหม่อง', 'ยาน้ำมันนวด', 'ยาดม', 'ลูกประคบสมุนไพร'].includes(category)) return 'cat-external';
        if (['เทียนหอม', 'ไม้หอม'].includes(category)) return 'cat-spa';
        if (['ชาสมุนไพร', 'น้ำผึ้ง'].includes(category)) return 'cat-food';
        return '';
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    // Translations
    const texts = {
        loading: {
            th: 'กำลังโหลดข้อมูลสินค้า...',
            en: 'Loading product...',
            zh: '正在加载产品...'
        },
        backToProducts: {
            th: 'กลับไปหน้าสินค้า',
            en: 'Back to Products',
            zh: '返回产品页面'
        },
        price: {
            th: 'ราคา:',
            en: 'Price:',
            zh: '价格:'
        },
        productDetails: {
            th: 'รายละเอียดสินค้า',
            en: 'Product Details',
            zh: '产品详情'
        },
        category: {
            th: 'หมวดหมู่:',
            en: 'Category:',
            zh: '类别:'
        },
        status: {
            th: 'สถานะ:',
            en: 'Status:',
            zh: '状态:'
        },
        inStock: {
            th: 'พร้อมส่ง',
            en: 'In Stock',
            zh: '有现货'
        },
        outOfStock: {
            th: 'สินค้าหมด',
            en: 'Out of Stock',
            zh: '缺货'
        },
        productCode: {
            th: 'รหัสสินค้า:',
            en: 'Product Code:',
            zh: '产品代码:'
        },
        quantity: {
            th: 'จำนวน:',
            en: 'Quantity:',
            zh: '数量:'
        },
        addedToCart: {
            th: '✓ เพิ่มแล้ว!',
            en: '✓ Added!',
            zh: '✓ 已添加!'
        },
        addToCart: {
            th: '🛒 หยิบใส่ตะกร้า',
            en: '🛒 Add to Cart',
            zh: '🛒 加入购物车'
        },
        buyNow: {
            th: 'สั่งซื้อเลย',
            en: 'Buy Now',
            zh: '立即购买'
        }
    };

    if (loading) {
        return (
            <div className="product-detail-page page">
                <div className="container section text-center">
                    <p>{texts.loading[language]}</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-page page">
                <div className="container">
                    <div className="error-message">
                        <h2>{error || (language === 'th' ? 'ไม่พบสินค้า' : language === 'en' ? 'Product not found' : '找不到产品')}</h2>
                        <Link to="/products" className="btn btn-primary">{texts.backToProducts[language]}</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page page">

            <div className="container">
                <div className="product-detail-container">
                    <div className="product-detail-image">
                        {product.icon && product.icon.startsWith('/') ? (
                            <img src={product.icon} alt={getProductName(product.name)} />
                        ) : (
                            <span className="product-emoji-large">{product.icon || '🌿'}</span>
                        )}
                    </div>
                    <div className="product-detail-info">
                        <div className="product-meta">
                            <span className={`product-category-badge ${getCategoryClass(product.category)}`}>
                                {getCategoryDisplay(product.category)}
                            </span>
                            {product.tag && (
                                <span className={`product-tag-badge ${product.tag === 'ขายดี' ? 'hot' :
                                    product.tag === 'ใหม่' ? 'new' :
                                        product.tag === 'แนะนำ' ? 'recommend' : ''
                                    }`}>
                                    {getTagDisplay(product.tag)}
                                </span>
                            )}
                        </div>
                        <h1 className="product-title">{getProductName(product.name)}</h1>
                        <div className="product-price">
                            {texts.price[language]} <span className="price-amount">{formatPrice(product.price)}</span>
                        </div>


                        <div className="product-full-details">
                            <h3>{texts.productDetails[language]}</h3>
                            <p>{getProductDesc(product.name, product.description)}</p>
                            <div className="product-specs">
                                <div className="spec-item">
                                    <span className="spec-label">{texts.category[language]}</span>
                                    <span className="spec-value">{getCategoryDisplay(product.category)}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">{texts.status[language]}</span>
                                    <span className="spec-value">
                                        {product.stock > 0 ? texts.inStock[language] : texts.outOfStock[language]}
                                    </span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">{texts.productCode[language]}</span>
                                    <span className="spec-value">{product.product_code}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">SKU:</span>
                                    <span className="spec-value">{String(product.id).padStart(6, '0')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="quantity-selector">
                            <span className="quantity-label">{texts.quantity[language]}</span>
                            <div className="quantity-controls">
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="qty-value">{quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="product-actions">
                            <button
                                onClick={handleAddToCart}
                                className={`btn btn-cart btn-lg ${addedToCart ? 'added' : ''}`}
                                disabled={addedToCart}
                            >
                                {addedToCart ? texts.addedToCart[language] : texts.addToCart[language]}
                            </button>
                            <button onClick={handleBuyNow} className="btn btn-primary btn-lg">
                                {texts.buyNow[language]}
                            </button>
                            <Link to="/products" className="btn btn-outline btn-lg">
                                {texts.backToProducts[language]}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
