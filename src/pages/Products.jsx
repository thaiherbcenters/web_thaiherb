import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
// [DISABLED] import { useCart } from '../context/CartContext';
import { useTranslation } from '../hooks/useTranslation';
import translations from '../translations';
import api from '../services/api';
import './Products.css';

const Products = () => {
    // [DISABLED] Cart feature
    // const { addToCart } = useCart();
    const { t, language } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('ทั้งหมด');
    const [addedProductId, setAddedProductId] = useState(null);

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
        return category; // Return as-is if not mapped
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
        return tag; // Return as-is if not mapped
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let data = await api.getProducts();

                // Sort products: Best Seller -> Recommended -> New -> Others
                data = data.sort((a, b) => {
                    const getPriority = (tag) => {
                        if (tag === 'ขายดี') return 1;
                        if (tag === 'แนะนำ') return 2;
                        if (tag === 'ใหม่') return 3;
                        return 4;
                    };

                    const priorityA = getPriority(a.tag);
                    const priorityB = getPriority(b.tag);

                    if (priorityA !== priorityB) {
                        return priorityA - priorityB;
                    }
                    return a.id - b.id;
                });

                setProducts(data);
            } catch (err) {
                console.error('Error loading products:', err);
                setError('ไม่สามารถโหลดข้อมูลสินค้าได้');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Extract unique categories from products
    const categories = useMemo(() => {
        if (!products.length) return ['ทั้งหมด'];
        const cats = new Set(products.map(p => p.category));
        return ['ทั้งหมด', ...Array.from(cats)];
    }, [products]);

    const filteredProducts = activeCategory === 'ทั้งหมด'
        ? products
        : products.filter(p => p.category === activeCategory);

    if (loading) {
        return (
            <div className="products-page page">
                <div className="container section text-center">
                    <p>
                        {language === 'th' ? 'กำลังโหลดข้อมูลสินค้า...'
                            : language === 'en' ? 'Loading products...'
                                : '正在加载产品...'}
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-page page">
                <div className="container section text-center">
                    <p className="text-error">
                        {language === 'th' ? 'ไม่สามารถโหลดข้อมูลสินค้าได้'
                            : language === 'en' ? 'Unable to load products'
                                : '无法加载产品'}
                    </p>
                    <button onClick={() => window.location.reload()} className="btn btn-outline">
                        {language === 'th' ? 'ลองใหม่อีกครั้ง'
                            : language === 'en' ? 'Try Again'
                                : '重试'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="products-page page">
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge slide-text slide-0">
                        {language === 'th' ? 'ผลิตภัณฑ์' : language === 'en' ? 'Products' : '产品'}
                    </span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        {language === 'th' ? 'ผลิตภัณฑ์' : language === 'en' ? 'Our' : '我们的'}
                        <span className="text-blue">
                            {language === 'th' ? 'ของเรา' : language === 'en' ? 'Products' : '产品'}
                        </span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {language === 'th' ? 'ผลิตภัณฑ์สมุนไพรคุณภาพสูงจากธรรมชาติ'
                            : language === 'en' ? 'High-quality herbal products from nature'
                                : '来自大自然的优质草药产品'}
                    </p>
                </div>
            </section>

            <div className="container section">
                {/* Filter */}
                <div className="products-filter">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {getCategoryDisplay(category)}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="products-grid grid grid-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-card card">
                                <div className="product-image">
                                    {product.tag && (
                                        <span className={`product-tag ${product.tag === 'ขายดี' ? 'tag-hot' : product.tag === 'แนะนำ' ? 'tag-recommend' : 'tag-new'}`}>
                                            {getTagDisplay(product.tag)}
                                        </span>
                                    )}
                                    {product.icon && product.icon.startsWith('/') ? (
                                        <img src={product.icon} alt={product.name} />
                                    ) : (
                                        <span className="product-emoji">{product.icon || '🌿'}</span>
                                    )}
                                </div>
                                <div className="product-content">
                                    <span className="product-category">{getCategoryDisplay(product.category)}</span>
                                    <h3 className="product-name">{getProductName(product.name)}</h3>
                                    <p className="product-desc">{getProductDesc(product.name, product.description)}</p>
                                    {/* [DISABLED] Price display - uncomment to re-enable
                                    <div className="product-price">
                                        {language === 'th'
                                            ? `฿${parseInt(product.price).toLocaleString()}`
                                            : language === 'en'
                                                ? `฿${parseInt(product.price).toLocaleString()} (~$${(parseInt(product.price) / 35).toFixed(2)})`
                                                : `฿${parseInt(product.price).toLocaleString()} (约¥${(parseInt(product.price) / 5).toFixed(0)})`}
                                    </div>
                                    */}
                                    <div className="product-actions-row">
                                        {/* [DISABLED] Add to cart button - uncomment to re-enable
                                        <button
                                            className={`btn-quick-add ${addedProductId === product.id ? 'added' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product, 1);
                                                setAddedProductId(product.id);
                                                setTimeout(() => setAddedProductId(null), 1500);
                                            }}
                                            disabled={addedProductId === product.id}
                                            title={language === 'th' ? 'เพิ่มลงตะกร้า' : language === 'en' ? 'Add to Cart' : '加入购物车'}
                                        >
                                            {addedProductId === product.id ? '✓' : '🛒'}
                                        </button>
                                        */}
                                        <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm product-btn">
                                            {language === 'th' ? 'ดูรายละเอียด' : language === 'en' ? 'View Details' : '查看详情'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <p>
                            {language === 'th' ? 'ไม่พบสินค้าในหมวดหมู่นี้'
                                : language === 'en' ? 'No products found in this category'
                                    : '此分类中没有找到产品'}
                        </p>
                    </div>
                )}
            </div>

            {/* OEM CTA */}
            <section className="section bg-soft">
                <div className="container">
                    <div className="oem-cta-card">
                        <div className="oem-cta-content">
                            <h2>
                                {language === 'th' ? 'สนใจผลิตสินค้าแบรนด์ของคุณเอง?'
                                    : language === 'en' ? 'Interested in creating your own brand?'
                                        : '有兴趣创建自己的品牌吗？'}
                            </h2>
                            <p>
                                {language === 'th' ? 'เรามีบริการ OEM ครบวงจร พร้อมให้คำปรึกษาฟรี'
                                    : language === 'en' ? 'We offer complete OEM services with free consultation'
                                        : '我们提供全面的OEM服务，并免费咨询'}
                            </p>
                            <Link to="/oem" className="btn btn-primary">
                                {language === 'th' ? 'ดูบริการ OEM' : language === 'en' ? 'View OEM Services' : '查看OEM服务'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
