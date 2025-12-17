import { Link } from 'react-router-dom';

import './OemOverview.css';

const OemOverview = () => {


    const highlights = [
        {
            icon: '🏭',
            title: 'โรงงานมาตรฐาน GMP',
            description: 'โรงงานผลิตที่ได้รับการรับรองมาตรฐาน GMP และ อย. พร้อมระบบควบคุมคุณภาพที่เข้มงวด',
            features: ['ผ่านการรับรอง GMP', 'ได้มาตรฐาน อย.', 'ระบบ QC เข้มงวด']
        },
        {
            icon: '🔬',
            title: 'ทีม R&D ผู้เชี่ยวชาญ',
            description: 'ทีมวิจัยและพัฒนาผลิตภัณฑ์ที่มีประสบการณ์ พร้อมพัฒนาสูตรเฉพาะตามความต้องการ',
            features: ['นักวิทยาศาสตร์เฉพาะทาง', 'พัฒนาสูตรเฉพาะ', 'วิจัยนวัตกรรมใหม่']
        },
        {
            icon: '📋',
            title: 'MOQ ต่ำ เริ่มต้นง่าย',
            description: 'ไม่มีขั้นต่ำการสั่งผลิตสูง เหมาะสำหรับผู้เริ่มต้นธุรกิจและ SME',
            features: ['เริ่มต้นจำนวนน้อยได้', 'ลดความเสี่ยง', 'เหมาะกับ SME']
        },
        {
            icon: '🎨',
            title: 'ออกแบบบรรจุภัณฑ์ฟรี',
            description: 'บริการออกแบบบรรจุภัณฑ์และฉลากโดยทีมดีไซน์เนอร์มืออาชีพ',
            features: ['ออกแบบฟรี', 'ทีมดีไซน์มืออาชีพ', 'แก้ไขไม่จำกัด']
        },
        {
            icon: '📜',
            title: 'ขึ้นทะเบียน อย. ฟรี',
            description: 'ดำเนินการขึ้นทะเบียนผลิตภัณฑ์กับ อย. ให้โดยไม่มีค่าใช้จ่ายเพิ่ม',
            features: ['ขึ้นทะเบียนฟรี', 'ดำเนินการให้ทั้งหมด', 'รวดเร็วทันใจ']
        },
        {
            icon: '🚚',
            title: 'จัดส่งทั่วประเทศ',
            description: 'บริการจัดส่งสินค้าถึงมือลูกค้าทั่วประเทศ รวดเร็ว ปลอดภัย',
            features: ['ส่งทั่วประเทศ', 'จัดส่งรวดเร็ว', 'บรรจุปลอดภัย']
        },
    ];

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



    const certifications = [
        { name: 'GMP', description: 'Good Manufacturing Practice' },
        { name: 'อย.', description: 'สำนักงานคณะกรรมการอาหารและยา' },
        { name: 'HACCP', description: 'Hazard Analysis Critical Control Point' },
        { name: 'ISO 22000', description: 'Food Safety Management' },
    ];

    return (
        <div className="oem-overview-page page">
            {/* Hero Section */}


            {/* Hero Section */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge animate-fadeInUp">OEM Service</span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        ผลิต OEM <span className="text-gold">ครบวงจร</span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        เจ้าของแบรนด์สมุนไพร ไม่ใช่เรื่องไกลตัวอีกต่อไป <br />
                        “ครบ จบ ใน ที่เดียว”
                    </p>
                </div>
            </section>





            {/* Pricing Info */}
            <section className="pricing-section section bg-soft">
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
                                    <h4>MOQ เริ่มต้นที่ 1000 บาท</h4>
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
                                    <p>เลือกเเบบบรรจุภัณฑ์</p>
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

            {/* Services Section */}
            <section id="services" className="services-section section bg-soft">
                <div className="container">
                    <div className="section-title">
                        <span className="badge">บริการของเรา</span>
                        <h2>บริการ <span className="text-gold">OEM ครบวงจร</span></h2>
                        <p>ดูแลตั้งแต่เริ่มต้น จนถึงสินค้าถึงมือคุณ</p>
                    </div>
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

            {/* Product Types Section */}
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



            {/* Certifications Section */}
            <section className="certifications-section section">
                <div className="container">
                    <div className="section-title">
                        <span className="badge">มาตรฐานรับรอง</span>
                        <h2>ได้รับการรับรอง<span>มาตรฐานสากล</span></h2>
                    </div>

                    <div className="certifications-grid">
                        {certifications.map((cert, index) => (
                            <div key={index} className="certification-card">
                                <div className="cert-badge">{cert.name}</div>
                                <p className="cert-description">{cert.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section id="highlights" className="highlights-section section">
                <div className="container">
                    <div className="section-title">
                        <span className="badge">จุดเด่นของเรา</span>
                        <h2>ทำไมต้องเลือก <span className="text-gold">OEM กับเรา</span></h2>
                        <p>มาตรฐานการผลิตระดับสากล พร้อมทีมงานมืออาชีพ</p>
                    </div>
                    <div className="highlights-grid grid grid-3">
                        {highlights.map((item, index) => (
                            <div key={index} className="highlight-card card">
                                <div className="highlight-icon">{item.icon}</div>
                                <h3 className="highlight-title">{item.title}</h3>
                                <p className="highlight-description">{item.description}</p>
                                <ul className="highlight-features">
                                    {item.features.map((feature, i) => (
                                        <li key={i}>
                                            <span className="feature-dot"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="oem-cta section">
                <div className="container">
                    <div className="oem-cta-card">
                        <div className="oem-cta-content">
                            <h2>พร้อมเริ่มต้นธุรกิจสมุนไพรของคุณ?</h2>
                            <p>
                                ติดต่อเราวันนี้เพื่อปรึกษาฟรี! ทีมงานผู้เชี่ยวชาญพร้อมให้คำแนะนำ
                            </p>
                            <div className="cta-buttons">
                                <Link to="/contact" className="btn btn-primary">
                                    ติดต่อเรา
                                    <span className="btn-arrow">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OemOverview;
