import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {
    const services = [
        {
            icon: '/images/service-products.png',
            title: 'ผลิตภัณฑ์สมุนไพร',
            description: 'ผลิตภัณฑ์สมุนไพรคุณภาพสูงจากธรรมชาติ',
            link: '/products'
        },
        {
            icon: '/images/service-oem.png',
            title: 'บริการ OEM',
            description: 'รับผลิตสินค้าสมุนไพรตามแบรนด์ของคุณ',
            link: '/oem'
        },
        {
            icon: '/images/service-training.jpg',
            title: 'การอบรมเเละกิจกรรม',
            description: 'บริการอบรมให้ความรู้และกิจกรรมส่งเสริมอาชีพด้านสมุนไพร',
            link: '/training'
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section - Split Design */}
            {/* Hero Section - Unified Design */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>
                            วิสาหกิจชุมชน<br />
                            <span className="text-white">ไทย เฮิร์บ เซ็นเตอร์</span>
                        </h1>
                        <p className="hero-subtitle">THAI HERB CENTERS</p>
                        <p className="hero-description">
                            ผู้เชี่ยวชาญด้านผลิตภัณฑ์สมุนไพรไทย พร้อมบริการ OEM ครบวงจร
                            <br /> และมีมาตรฐาน GMP
                        </p>
                        <div className="hero-buttons">
                            <Link to="/products" className="btn btn-white">
                                ดูผลิตภัณฑ์
                            </Link>
                            <Link to="/oem" className="btn btn-outline-white">
                                บริการ OEM
                            </Link>
                        </div>

                        {/* Certifications Banner */}
                        <div className="hero-certifications">
                            <img
                                src="/images/certifications-banner.png"
                                alt="ได้รับมาตรฐาน GMP, OTOP, Green Industry"
                                className="cert-banner-img"
                            />
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
                            <Link key={index} to={service.link} className="service-card-link">
                                <div className="service-card card">
                                    <div className="service-icon">
                                        {service.icon.startsWith('/') ? (
                                            <img src={service.icon} alt={service.title} />
                                        ) : (
                                            service.icon
                                        )}
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </Link>
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
