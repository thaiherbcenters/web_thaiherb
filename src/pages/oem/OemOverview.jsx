import { Link } from 'react-router-dom';
import './OemOverview.css';

const OemOverview = () => {
    const stats = [
        { number: '200+', label: 'ลูกค้า OEM' },
        { number: '500+', label: 'สูตรผลิตภัณฑ์' },
        { number: '15+', label: 'ปีประสบการณ์' },
        { number: '99%', label: 'ความพึงพอใจ' },
    ];

    const process = [
        {
            step: '01',
            title: 'ปรึกษาและวางแผน',
            description: 'พูดคุยความต้องการ กำหนดเป้าหมาย และวางแผนการผลิต'
        },
        {
            step: '02',
            title: 'พัฒนาสูตร',
            description: 'ทีม R&D พัฒนาสูตรผลิตภัณฑ์ตามความต้องการ'
        },
        {
            step: '03',
            title: 'ออกแบบบรรจุภัณฑ์',
            description: 'ออกแบบบรรจุภัณฑ์ที่สวยงามและตรงกับแบรนด์'
        },
        {
            step: '04',
            title: 'ผลิตและส่งมอบ',
            description: 'ผลิตด้วยมาตรฐาน GMP และส่งมอบตรงเวลา'
        }
    ];

    return (
        <div className="oem-overview-page page">
            {/* Hero Section */}
            <section className="oem-hero">
                <div className="oem-hero-bg">
                    <div className="oem-hero-overlay"></div>
                </div>

                <div className="oem-hero-content container">
                    <span className="badge animate-fadeInUp">OEM Service</span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        ผลิต OEM <span className="text-gold">ครบวงจร</span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        เจ้าของเเบรนดืสมุนไพร ไม่ใช่เรื่องไกลตัวอีกต่อไป <br />
                        “ครบ จบ ใน ที่เดียว”
                    </p>

                    {/* CTA Buttons */}
                    <div className="oem-hero-buttons animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <Link to="/oem/highlights" className="btn btn-primary">
                            <span className="btn-icon">✨</span>
                            จุดเด่น OEM ของเรา
                        </Link>
                        <Link to="/oem/services" className="btn btn-secondary">
                            <span className="btn-icon">🛠️</span>
                            บริการของเรา
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="oem-stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About OEM Section */}
            <section className="oem-about section">
                <div className="container">
                    <div className="oem-about-grid">
                        <div className="oem-about-content">
                            <span className="badge">เกี่ยวกับบริการ OEM</span>
                            <h2>สร้างแบรนด์สมุนไพร<br /><span className="text-gold">ของคุณเอง</span></h2>
                            <div className="divider"></div>
                            <p>
                                พรีเมียร์ สมาร์ท ฟาร์ม ให้บริการ OEM ครบวงจร
                                สำหรับผู้ประกอบการที่ต้องการสร้างแบรนด์ผลิตภัณฑ์สมุนไพรของตัวเอง
                                เราพร้อมสนับสนุนตั้งแต่ไอเดียจนถึงสินค้าพร้อมขาย
                            </p>
                            <p>
                                ด้วยประสบการณ์กว่า 15 ปี โรงงานมาตรฐาน GMP และทีมงาน R&D ผู้เชี่ยวชาญ
                                เราสามารถพัฒนาสูตรผลิตภัณฑ์ที่หลากหลาย ตอบโจทย์ทุกความต้องการ
                            </p>

                            <div className="oem-features">
                                <div className="oem-feature">
                                    <span className="feature-check">✓</span>
                                    <span>ไม่มีขั้นต่ำการสั่งผลิต (MOQ ต่ำ)</span>
                                </div>
                                <div className="oem-feature">
                                    <span className="feature-check">✓</span>
                                    <span>พัฒนาสูตรตามความต้องการ</span>
                                </div>
                                <div className="oem-feature">
                                    <span className="feature-check">✓</span>
                                    <span>ออกแบบบรรจุภัณฑ์ฟรี</span>
                                </div>
                                <div className="oem-feature">
                                    <span className="feature-check">✓</span>
                                    <span>ขึ้นทะเบียน อย. ให้ฟรี</span>
                                </div>
                            </div>
                        </div>

                        <div className="oem-about-image">
                            <div className="image-frame">
                                <div className="image-placeholder">
                                    <span>🏭</span>
                                    <p>OEM Factory</p>
                                </div>
                            </div>
                            <div className="image-decoration"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="oem-process section">
                <div className="container">
                    <div className="section-title">
                        <span className="badge">ขั้นตอนการทำงาน</span>
                        <h2>กระบวนการผลิต <span>OEM</span></h2>
                        <p>ขั้นตอนการทำงานที่โปร่งใส เข้าใจง่าย ติดตามได้ทุกขั้นตอน</p>
                    </div>

                    <div className="process-timeline">
                        {process.map((item, index) => (
                            <div key={index} className="process-item">
                                <div className="process-step">{item.step}</div>
                                <div className="process-content">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
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
                                <Link to="/oem/services" className="btn btn-outline">
                                    ดูบริการทั้งหมด
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
