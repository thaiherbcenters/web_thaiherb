import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await api.getProductById(id);
                if (data) {
                    setProduct(data);
                    setError(null);
                } else {
                    setError('ไม่พบสินค้านี้');
                }
            } catch (err) {
                console.error('Error loading product:', err);
                setError('เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    // Helper to get color class for category
    const getCategoryClass = (category) => {
        if (!category) return '';
        if (['ยาแคปซูล', 'ยาดองสมุนไพร'].includes(category)) return 'cat-medicine';
        if (['ยาหม่อง', 'ยาน้ำมันนวด', 'ยาดม', 'ลูกประคบสมุนไพร'].includes(category)) return 'cat-external';
        if (['เทียนหอม', 'ไม้หอม'].includes(category)) return 'cat-spa';
        if (['ชาสมุนไพร', 'น้ำผึ้ง'].includes(category)) return 'cat-food';
        return '';
    };

    if (loading) {
        return (
            <div className="product-detail-page page">
                <div className="container section text-center">
                    <p>กำลังโหลดข้อมูลสินค้า...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-page page">
                <div className="container">
                    <div className="error-message">
                        <h2>{error || 'ไม่พบสินค้า'}</h2>
                        <Link to="/products" className="btn btn-primary">กลับไปหน้าสินค้า</Link>
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
                            <img src={product.icon} alt={product.name} />
                        ) : (
                            <span className="product-emoji-large">{product.icon || '🌿'}</span>
                        )}
                    </div>
                    <div className="product-detail-info">
                        <div className="product-meta">
                            <span className={`product-category-badge ${getCategoryClass(product.category)}`}>
                                {product.category}
                            </span>
                            {product.tag && (
                                <span className={`product-tag-badge ${product.tag === 'ขายดี' ? 'hot' :
                                    product.tag === 'ใหม่' ? 'new' :
                                        product.tag === 'แนะนำ' ? 'recommend' : ''
                                    }`}>
                                    {product.tag}
                                </span>
                            )}
                        </div>
                        <h1 className="product-title">{product.name}</h1>
                        <div className="product-price">
                            ราคา: <span className="price-amount">฿{parseInt(product.price).toLocaleString()}</span>
                        </div>


                        <div className="product-full-details">
                            <h3>รายละเอียดสินค้า</h3>
                            <p>{product.description}</p>
                            <div className="product-specs">
                                <div className="spec-item">
                                    <span className="spec-label">หมวดหมู่:</span>
                                    <span className="spec-value">{product.category}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">สถานะ:</span>
                                    <span className="spec-value">{product.stock > 0 ? 'พร้อมส่ง' : 'สินค้าหมด'}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">รหัสสินค้า:</span>
                                    <span className="spec-value">{product.product_code}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">SKU:</span>
                                    <span className="spec-value">{String(product.id).padStart(6, '0')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="product-actions">
                            <button onClick={() => alert('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว (จำลอง)')} className="btn btn-cart btn-lg">
                                🛒 หยิบใส่ตะกร้า
                            </button>
                            <Link to="/checkout" className="btn btn-primary btn-lg">
                                สั่งซื้อสินค้า
                            </Link>
                            <Link to="/products" className="btn btn-outline btn-lg">
                                กลับไปหน้าสินค้า
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
