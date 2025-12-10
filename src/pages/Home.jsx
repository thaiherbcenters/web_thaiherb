import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const services = [
        {
            icon: '🌿',
            title: 'ผลิตภัณฑ์สมุนไพร',
            description: 'ผลิตภัณฑ์สมุนไพรคุณภาพสูงจากธรรมชาติ'
        },
        {
            icon: '🏭',
            title: 'บริการ OEM',
            description: 'รับผลิตสินค้าสมุนไพรตามแบรนด์ของคุณ'
        },
        {
            icon: '✨',
            title: 'มาตรฐาน อย.',
            description: 'ผลิตภัณฑ์ผ่านการรับรองมาตรฐาน'
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section - Split Design */}
            <section className="hero">
                {/* Left - Green Background */}
                <div className="hero-left">
                    <div className="hero-content">
                        <h1>
                            วิสาหกิจชุมชน<br />
                            <span className="text-white">ไทยเฮิร์บ เซ็นเตอร์</span>
                        </h1>
                        <p className="hero-subtitle">THAI HERB CENTERS</p>
                        <p className="hero-description">
                            ผู้เชี่ยวชาญด้านผลิตภัณฑ์สมุนไพรไทย พร้อมบริการ OEM ครบวงจร
                            ด้วยประสบการณ์กว่า 15 ปี และโรงงานมาตรฐาน GMP
                        </p>
                        <div className="hero-buttons">
                            <Link to="/products" className="btn btn-white">
                                ดูผลิตภัณฑ์
                            </Link>
                            <Link to="/oem" className="btn btn-outline-white">
                                บริการ OEM
                            </Link>
                        </div>

                        {/* Stats inside left section */}
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">ผลิตภัณฑ์</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">200+</span>
                                <span className="stat-label">ลูกค้า OEM</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">ปีประสบการณ์</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">มาตรฐาน อย.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Image Background */}
                <div className="hero-right">
                    <div className="hero-image-overlay"></div>
                    <div className="hero-image-content">
                        <div className="image-badge">
                            <span>🌿</span>
                            <p>คุณภาพจากธรรมชาติ</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services section">
                <div className="container">
                    <div className="section-title">
                        <h2>บริการของ<span>เรา</span></h2>
                    </div>

                    <div className="services-grid grid grid-3">
                        {services.map((service, index) => (
                            <div key={index} className="service-card card">
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <div className="cta-box">
                        <h2>สนใจสร้างแบรนด์สมุนไพรของคุณ?</h2>
                        <p>ติดต่อเราเพื่อรับคำปรึกษาฟรี</p>
                        <Link to="/contact" className="btn btn-primary">
                            ติดต่อเรา
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
