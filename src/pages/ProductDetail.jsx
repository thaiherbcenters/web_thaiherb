import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    // Helper to get color class for category
    const getCategoryClass = (category) => {
        if (['ยาแคปซูล', 'ยาดองสมุนไพร'].includes(category)) return 'cat-medicine';
        if (['ยาหม่อง', 'ยาน้ำมันนวด', 'ยาดม', 'ลูกประคบสมุนไพร'].includes(category)) return 'cat-external';
        if (['เทียนหอม', 'ไม้หอม'].includes(category)) return 'cat-spa';
        if (['ชาสมุนไพร', 'น้ำผึ้ง'].includes(category)) return 'cat-food';
        return '';
    };

    if (!product) {
        return (
            <div className="product-detail-page page">
                <div className="container">
                    <div className="error-message">
                        <h2>ไม่พบสินค้า</h2>
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
                        {product.icon.startsWith('/') ? (
                            <img src={product.icon} alt={product.name} />
                        ) : (
                            <span className="product-emoji-large">{product.icon}</span>
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
                            ราคา: <span className="price-amount">฿{product.price}</span>
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
                                    <span className="spec-value">{product.tag || 'พร้อมส่ง'}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">เลขทะเบียนที่:</span>
                                    <span className="spec-value">{product.regNo || 'G 123/66'}</span>
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
