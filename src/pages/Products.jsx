import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const categories = [
        { id: 'all', name: 'ทั้งหมด' },
        { id: 'supplement', name: 'อาหารเสริม' },
        { id: 'oil', name: 'น้ำมันสมุนไพร' },
        { id: 'tea', name: 'ชาสมุนไพร' },
        { id: 'extract', name: 'สารสกัด' },
    ];

    const products = [
        {
            id: 1,
            name: 'แคปซูลขมิ้นชัน',
            category: 'อาหารเสริม',
            description: 'บำรุงระบบทางเดินอาหาร ช่วยย่อยอาหาร',
            icon: '/images/products/turmeric-capsule.png',
            tag: 'ขายดี'
        },
        {
            id: 2,
            name: 'แคปซูลยารางจืด',
            category: 'น้ำมันสมุนไพร',
            description: 'บรรเทาอาการปวดเมื่อย คลายกล้ามเนื้อ',
            icon: '/images/products/turmeric-capsule1.png',
            tag: ''
        },
        {
            id: 3,
            name: 'ชาใบหม่อน',
            category: 'ชาสมุนไพร',
            description: 'ควบคุมน้ำตาลในเลือด บำรุงสุขภาพ',
            icon: '/images/products/turmeric-capsule2.png',
            tag: 'ใหม่'
        },
        {
            id: 4,
            name: 'สารสกัดกระชายดำ',
            category: 'สารสกัด',
            description: 'เพิ่มพลังงาน บำรุงร่างกาย',
            icon: '/images/products/turmeric-capsule3.png',
            tag: ''
        },
        {
            id: 5,
            name: 'แคปซูลฟ้าทะลายโจร',
            category: 'อาหารเสริม',
            description: 'เสริมภูมิคุ้มกัน ต้านการอักเสบ',
            icon: '💊',
            tag: 'ขายดี'
        },
        {
            id: 6,
            name: 'น้ำมันไพล',
            category: 'น้ำมันสมุนไพร',
            description: 'บรรเทาอาการปวดข้อ ลดการอักเสบ',
            icon: '🧴',
            tag: ''
        },
        {
            id: 7,
            name: 'ชาตะไคร้หอม',
            category: 'ชาสมุนไพร',
            description: 'ผ่อนคลาย ช่วยการนอนหลับ',
            icon: '🍵',
            tag: ''
        },
        {
            id: 8,
            name: 'สารสกัดมะรุม',
            category: 'สารสกัด',
            description: 'อุดมด้วยสารอาหาร วิตามินและเกลือแร่',
            icon: '🧪',
            tag: 'ใหม่'
        },
    ];

    return (
        <div className="products-page page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <span className="badge">Products</span>
                    <h1>ผลิตภัณฑ์<span className="text-gold">สมุนไพร</span></h1>
                    <p>
                        ผลิตภัณฑ์สมุนไพรคุณภาพสูงจากธรรมชาติ ผลิตด้วยกระบวนการมาตรฐาน GMP
                    </p>
                </div>
            </div>

            {/* Products Section */}
            <section className="products-section section">
                <div className="container">
                    {/* Categories Filter */}
                    <div className="products-filter">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${cat.id === 'all' ? 'active' : ''}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="products-grid grid grid-4">
                        {products.map((product) => (
                            <div key={product.id} className="product-card card">
                                {product.tag && (
                                    <span className={`product-tag ${product.tag === 'ใหม่' ? 'tag-new' : 'tag-hot'}`}>
                                        {product.tag}
                                    </span>
                                )}
                                <div className="product-image">
                                    {product.icon.startsWith('/') ? (
                                        <img src={product.icon} alt={product.name} className="product-img-icon" />
                                    ) : (
                                        <span className="product-emoji">{product.icon}</span>
                                    )}
                                </div>
                                <div className="product-content">
                                    <span className="product-category">{product.category}</span>
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-description">{product.description}</p>
                                </div>
                                <button className="product-btn btn btn-outline">
                                    ดูรายละเอียด
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OEM CTA */}
            <section className="oem-cta section">
                <div className="container">
                    <div className="oem-cta-card">
                        <div className="oem-cta-icon">🏭</div>
                        <div className="oem-cta-content">
                            <h3>ต้องการสร้างแบรนด์ผลิตภัณฑ์สมุนไพรของคุณเอง?</h3>
                            <p>
                                เราให้บริการ OEM ครบวงจร ตั้งแต่พัฒนาสูตร ผลิต บรรจุ จนถึงจัดส่ง
                            </p>
                        </div>
                        <Link to="/oem" className="btn btn-primary">
                            ดูบริการ OEM
                            <span className="btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
