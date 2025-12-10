import { Link } from 'react-router-dom';
import './OemServices.css';

const OemServices = () => {
    const services = [
        {
            icon: '🔬',
            title: 'พัฒนาสูตรผลิตภัณฑ์',
            description: 'ทีม R&D พัฒนาสูตรผลิตภัณฑ์ตามความต้องการ ไม่ว่าจะเป็นสูตรใหม่หรือปรับปรุงสูตรเดิม',
            details: [
                'วิจัยและพัฒนาสูตรใหม่',
                'ปรับปรุงสูตรเดิม',
                'ทดสอบคุณภาพและความคงตัว',
                'วิเคราะห์ส่วนประกอบ'
            ]
        },
        {
            icon: '🏭',
            title: 'ผลิตตามสั่ง',
            description: 'บริการผลิตผลิตภัณฑ์สมุนไพรทุกประเภท ด้วยโรงงานมาตรฐาน GMP',
            details: [
                'แคปซูลและเม็ด',
                'ผงและเครื่องดื่ม',
                'น้ำมันและสารสกัด',
                'ครีมและเจล'
            ]
        },
        {
            icon: '🎨',
            title: 'ออกแบบบรรจุภัณฑ์',
            description: 'บริการออกแบบบรรจุและฉลากผลิตภัณฑ์โดยทีมดีไซน์มืออาชีพ',
            details: [
                'ออกแบบฉลากและกล่อง',
                'ออกแบบโลโก้แบรนด์',
                'พิมพ์บรรจุภัณฑ์คุณภาพสูง',
                'แก้ไขไม่จำกัดครั้ง'
            ]
        },
        {
            icon: '📜',
            title: 'ขึ้นทะเบียน อย.',
            description: 'ดำเนินการขึ้นทะเบียนผลิตภัณฑ์กับ อย. และหน่วยงานที่เกี่ยวข้อง',
            details: [
                'เตรียมเอกสารทั้งหมด',
                'ประสานงานกับ อย.',
                'ติดตามสถานะให้',
                'รับรองภายใน 30 วัน'
            ]
        },
        {
            icon: '📦',
            title: 'บรรจุและแพคกิ้ง',
            description: 'บริการบรรจุผลิตภัณฑ์และแพคกิ้งด้วยเครื่องจักรที่ทันสมัย',
            details: [
                'บรรจุแบบอัตโนมัติ',
                'ปิดผนึกสูญญากาศ',
                'ติดฉลากและบาร์โค้ด',
                'QC ทุกชิ้น'
            ]
        },
        {
            icon: '🚚',
            title: 'จัดเก็บและจัดส่ง',
            description: 'บริการจัดเก็บสินค้าและจัดส่งถึงมือลูกค้าทั่วประเทศ',
            details: [
                'คลังสินค้าควบคุมอุณหภูมิ',
                'จัดส่งทั่วประเทศ',
                'ติดตามสถานะ Real-time',
                'ประกันความเสียหาย'
            ]
        },
    ];

    const productTypes = [
        { icon: '💊', name: 'แคปซูลสมุนไพร' },
        { icon: '💧', name: 'น้ำมันสมุนไพร' },
        { icon: '🍵', name: 'ชาสมุนไพร' },
        { icon: '🧴', name: 'ครีมและเจล' },
        { icon: '🧪', name: 'สารสกัดเข้มข้น' },
        { icon: '🥤', name: 'เครื่องดื่มสมุนไพร' },
        { icon: '💎', name: 'ผลิตภัณฑ์พรีเมียม' },
        { icon: '🌿', name: 'ผงสมุนไพร' },
    ];

    return (
        <div className="oem-services-page page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <span className="badge">OEM Services</span>
                    <h1>บริการ<span className="text-gold">ของเรา</span></h1>
                    <p>
                        บริการ OEM ครบวงจร ตั้งแต่พัฒนาสูตร ผลิต บรรจุ จนถึงจัดส่ง
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <section className="services-section section">
                <div className="container">
                    <div className="services-grid grid grid-3">
                        {services.map((service, index) => (
                            <div key={index} className="service-card card">
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <ul className="service-details">
                                    {service.details.map((detail, i) => (
                                        <li key={i}>
                                            <span className="detail-check">✓</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Types */}
            <section className="product-types-section section">
                <div className="container">
                    <div className="section-title">
                        <span className="badge">ประเภทผลิตภัณฑ์</span>
                        <h2>ผลิตภัณฑ์ที่<span>เราผลิตได้</span></h2>
                        <p>เราสามารถผลิตผลิตภัณฑ์สมุนไพรได้หลากหลายประเภท</p>
                    </div>

                    <div className="product-types-grid">
                        {productTypes.map((type, index) => (
                            <div key={index} className="product-type-card">
                                <span className="type-icon">{type.icon}</span>
                                <span className="type-name">{type.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Info */}
            <section className="pricing-section section">
                <div className="container">
                    <div className="pricing-card">
                        <div className="pricing-header">
                            <span className="badge">ราคาและเงื่อนไข</span>
                            <h2>เริ่มต้น<span className="text-gold">ง่ายๆ</span></h2>
                        </div>

                        <div className="pricing-features">
                            <div className="pricing-feature">
                                <div className="feature-icon">📦</div>
                                <div className="feature-content">
                                    <h4>MOQ เริ่มต้นที่ 500 ชิ้น</h4>
                                    <p>เหมาะสำหรับผู้เริ่มต้นธุรกิจ</p>
                                </div>
                            </div>
                            <div className="pricing-feature">
                                <div className="feature-icon">💰</div>
                                <div className="feature-content">
                                    <h4>ราคาขึ้นอยู่กับสูตรและบรรจุภัณฑ์</h4>
                                    <p>ติดต่อเพื่อรับใบเสนอราคา</p>
                                </div>
                            </div>
                            <div className="pricing-feature">
                                <div className="feature-icon">🎁</div>
                                <div className="feature-content">
                                    <h4>ฟรี! ออกแบบบรรจุภัณฑ์</h4>
                                    <p>รวมขึ้นทะเบียน อย. ให้ฟรี</p>
                                </div>
                            </div>
                            <div className="pricing-feature">
                                <div className="feature-icon">⏱️</div>
                                <div className="feature-content">
                                    <h4>ระยะเวลาผลิต 15-30 วัน</h4>
                                    <p>ขึ้นอยู่กับประเภทผลิตภัณฑ์</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-cta section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2>พร้อมเริ่มต้นแล้วหรือยัง?</h2>
                            <p>
                                ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี!
                                ทีมงานพร้อมให้บริการและตอบทุกคำถาม
                            </p>
                            <div className="cta-buttons">
                                <Link to="/contact" className="btn btn-primary">
                                    ติดต่อเรา
                                    <span className="btn-arrow">→</span>
                                </Link>
                                <Link to="/oem/highlights" className="btn btn-outline">
                                    ดูจุดเด่นของเรา
                                </Link>
                            </div>
                        </div>
                        <div className="cta-icon-wrapper">
                            <span className="cta-icon">🏭</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OemServices;
