import { Link } from 'react-router-dom';
import './OemHighlights.css';

const OemHighlights = () => {
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

    const certifications = [
        { name: 'GMP', description: 'Good Manufacturing Practice' },
        { name: 'อย.', description: 'สำนักงานคณะกรรมการอาหารและยา' },
        { name: 'HACCP', description: 'Hazard Analysis Critical Control Point' },
        { name: 'ISO 22000', description: 'Food Safety Management' },
    ];

    return (
        <div className="oem-highlights-page page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <span className="badge">OEM Highlights</span>
                    <h1>จุดเด่น OEM <span className="text-gold">ของเรา</span></h1>
                    <p>
                        ทำไมต้องเลือกเรา? ค้นพบจุดเด่นและข้อได้เปรียบที่จะทำให้ธุรกิจของคุณประสบความสำเร็จ
                    </p>
                </div>
            </div>

            {/* Highlights Grid */}
            <section className="highlights-section section">
                <div className="container">
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

            {/* Certifications Section */}
            <section className="certifications-section section">
                <div className="container">
                    <div className="section-title">
                        <span className="badge">มาตรฐานรับรอง</span>
                        <h2>ได้รับการรับรอง<span>มาตรฐานสากล</span></h2>
                        <p>โรงงานของเราได้รับการรับรองมาตรฐานคุณภาพระดับสากล</p>
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

            {/* Why Us Section */}
            <section className="why-us-section section">
                <div className="container">
                    <div className="why-us-grid">
                        <div className="why-us-content">
                            <span className="badge">ทำไมต้องเลือกเรา</span>
                            <h2>ความแตกต่างที่คุณ<br /><span className="text-gold">ไว้วางใจได้</span></h2>
                            <div className="divider"></div>

                            <div className="why-us-list">
                                <div className="why-us-item">
                                    <div className="item-number">01</div>
                                    <div className="item-content">
                                        <h4>ประสบการณ์มากกว่า 15 ปี</h4>
                                        <p>เราสั่งสมประสบการณ์ในอุตสาหกรรมสมุนไพรมายาวนาน</p>
                                    </div>
                                </div>
                                <div className="why-us-item">
                                    <div className="item-number">02</div>
                                    <div className="item-content">
                                        <h4>ลูกค้ามากกว่า 200 แบรนด์</h4>
                                        <p>ได้รับความไว้วางใจจากแบรนด์ชั้นนำทั่วประเทศ</p>
                                    </div>
                                </div>
                                <div className="why-us-item">
                                    <div className="item-number">03</div>
                                    <div className="item-content">
                                        <h4>บริการครบวงจร One-Stop Service</h4>
                                        <p>ตั้งแต่พัฒนาสูตรจนถึงส่งมอบสินค้าพร้อมขาย</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="why-us-image">
                            <div className="image-frame">
                                <div className="image-placeholder">
                                    <span>✨</span>
                                    <p>Quality First</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="highlights-cta section">
                <div className="container">
                    <div className="cta-card">
                        <h2>พร้อมสร้างแบรนด์ของคุณแล้วหรือยัง?</h2>
                        <p>ติดต่อเราวันนี้ รับคำปรึกษาฟรี!</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn btn-primary">
                                ติดต่อเรา
                                <span className="btn-arrow">→</span>
                            </Link>
                            <Link to="/oem/services" className="btn btn-secondary">
                                ดูบริการของเรา
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OemHighlights;
