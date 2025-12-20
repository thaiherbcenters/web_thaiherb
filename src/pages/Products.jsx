import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await api.getProducts();
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
                    <p>กำลังโหลดข้อมูลสินค้า...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-page page">
                <div className="container section text-center">
                    <p className="text-error">{error}</p>
                    <button onClick={() => window.location.reload()} className="btn btn-outline">
                        ลองใหม่อีกครั้ง
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="products-page page">
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge animate-fadeInUp">ผลิตภัณฑ์</span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        ผลิตภัณฑ์<span className="text-gold">ของเรา</span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        ผลิตภัณฑ์สมุนไพรคุณภาพสูงจากธรรมชาติ
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
                            {category}
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
                                        <span className={`product-tag ${product.tag === 'ขายดี' ? 'tag-hot' : 'tag-new'}`}>
                                            {product.tag}
                                        </span>
                                    )}
                                    {product.icon && product.icon.startsWith('/') ? (
                                        <img src={product.icon} alt={product.name} />
                                    ) : (
                                        <span className="product-emoji">{product.icon || '🌿'}</span>
                                    )}
                                </div>
                                <div className="product-content">
                                    <span className="product-category">{product.category}</span>
                                    <h3>{product.name}</h3>
                                    <p className="product-desc">{product.description}</p>
                                    <div className="product-footer">
                                        <div className="product-price">฿{product.price}</div>
                                        <Link to={`/products/${product.id}`} className="btn btn-outline btn-sm product-btn">
                                            ดูรายละเอียด
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <p>ไม่พบสินค้าในหมวดหมู่นี้</p>
                    </div>
                )}
            </div>

            {/* OEM CTA */}
            <section className="section bg-soft">
                <div className="container">
                    <div className="oem-cta-card">
                        <div className="oem-cta-content">
                            <h2>สนใจผลิตสินค้าแบรนด์ของคุณเอง?</h2>
                            <p>เรามีบริการ OEM ครบวงจร พร้อมให้คำปรึกษาฟรี</p>
                            <Link to="/oem" className="btn btn-primary">
                                ดูบริการ OEM
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
