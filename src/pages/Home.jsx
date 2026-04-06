import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import ImageSlider from '../components/ImageSlider';
import Standards from '../components/Standards';
import { useTranslation } from '../hooks/useTranslation';
import './Home.css';


const Home = () => {
    const { t, language } = useTranslation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const newsContainerRef = useRef(null);
    const [facebookPosts, setFacebookPosts] = useState([]);
    const [fbLoading, setFbLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const backendUrl = import.meta.env.VITE_API_URL || '';
                const response = await fetch(`${backendUrl}/api/news`);
                const data = await response.json();
                if (data.status === 'success') {
                    setFacebookPosts(data.data);
                }
            } catch (err) {
                console.error("Error fetching news for home:", err);
            } finally {
                setFbLoading(false);
            }
        };
        fetchNews();
    }, []);

    // News with translations
    const getNews = () => [
        {
            id: 1,
            image: '/images/news-1.jpg',
            date: language === 'th' ? '20 ธ.ค. 2567' : language === 'en' ? 'Dec 20, 2024' : '2024年12月20日',
            title: language === 'th' ? 'ไทยเฮิร์บเซ็นเตอร์ ผ่านการรับรอง GMP'
                : language === 'en' ? 'Thai Herb Centers Receives GMP Certification'
                    : '泰国草药中心获得GMP认证',
            description: language === 'th' ? 'โรงงานของเราได้รับการรับรองมาตรฐาน GMP จาก อย. เป็นที่เรียบร้อย'
                : language === 'en' ? 'Our factory has been certified to GMP standards by the FDA.'
                    : '我们的工厂已获得FDA的GMP标准认证。',
            category: language === 'th' ? 'ข่าวสาร' : language === 'en' ? 'News' : '新闻'
        },
        {
            id: 2,
            image: '/images/news-2.jpg',
            date: language === 'th' ? '15 ธ.ค. 2567' : language === 'en' ? 'Dec 15, 2024' : '2024年12月15日',
            title: language === 'th' ? 'งานแสดงสินค้า OTOP City 2024'
                : language === 'en' ? 'OTOP City 2024 Exhibition'
                    : 'OTOP City 2024展览会',
            description: language === 'th' ? 'พบกับบูธสินค้าสมุนไพรของเราในงาน OTOP City ที่อิมแพค เมืองทองธานี'
                : language === 'en' ? 'Visit our herbal product booth at OTOP City, IMPACT Muang Thong Thani.'
                    : '欢迎参观我们在IMPACT蒙通他尼OTOP City的草药产品展位。',
            category: language === 'th' ? 'กิจกรรม' : language === 'en' ? 'Events' : '活动'
        },
        {
            id: 3,
            image: '/images/news-3.jpg',
            date: language === 'th' ? '10 ธ.ค. 2567' : language === 'en' ? 'Dec 10, 2024' : '2024年12月10日',
            title: language === 'th' ? 'เปิดตัวผลิตภัณฑ์ใหม่ น้ำมันสมุนไพร'
                : language === 'en' ? 'New Product Launch: Herbal Oil'
                    : '新产品发布：草药油',
            description: language === 'th' ? 'ผลิตภัณฑ์น้ำมันสมุนไพรสูตรใหม่ บรรเทาอาการปวดเมื่อย'
                : language === 'en' ? 'New herbal oil formula for pain and muscle relief.'
                    : '新配方草药油，缓解疼痛和肌肉酸痛。',
            category: language === 'th' ? 'ข่าวสาร' : language === 'en' ? 'News' : '新闻'
        },
        {
            id: 4,
            image: '/images/news-4.jpg',
            date: language === 'th' ? '5 ธ.ค. 2567' : language === 'en' ? 'Dec 5, 2024' : '2024年12月5日',
            title: language === 'th' ? 'อบรมการปลูกสมุนไพรอินทรีย์'
                : language === 'en' ? 'Organic Herb Cultivation Training'
                    : '有机草药种植培训',
            description: language === 'th' ? 'จัดอบรมให้ความรู้แก่เกษตรกรในพื้นที่เรื่องการปลูกสมุนไพรแบบอินทรีย์'
                : language === 'en' ? 'Training local farmers on organic herb cultivation methods.'
                    : '培训当地农民有机草药种植方法。',
            category: language === 'th' ? 'กิจกรรม' : language === 'en' ? 'Events' : '活动'
        },
        {
            id: 5,
            image: '/images/news-5.jpg',
            date: language === 'th' ? '1 ธ.ค. 2567' : language === 'en' ? 'Dec 1, 2024' : '2024年12月1日',
            title: language === 'th' ? 'รางวัลผลิตภัณฑ์ยอดเยี่ยม'
                : language === 'en' ? 'Best Product Award'
                    : '最佳产品奖',
            description: language === 'th' ? 'ได้รับรางวัลผลิตภัณฑ์สมุนไพรยอดเยี่ยมจากกระทรวงสาธารณสุข'
                : language === 'en' ? 'Received the Best Herbal Product Award from the Ministry of Public Health.'
                    : '获得卫生部颁发的最佳草药产品奖。',
            category: language === 'th' ? 'ข่าวสาร' : language === 'en' ? 'News' : '新闻'
        }
    ];

    const news = getNews();

    const scrollNews = (direction) => {
        const container = newsContainerRef.current;
        if (container) {
            const scrollAmount = 320;
            const newPosition = direction === 'left'
                ? Math.max(0, scrollPosition - scrollAmount)
                : scrollPosition + scrollAmount;

            container.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
            setScrollPosition(newPosition);
        }
    };

    const handleScroll = () => {
        if (newsContainerRef.current) {
            setScrollPosition(newsContainerRef.current.scrollLeft);
        }
    };

    // Services with translations
    const getServices = () => [
        {
            icon: '/images/service-oem.png',
            title: language === 'th' ? 'รับทำ OEM' : language === 'en' ? 'OEM Services' : 'OEM代工',
            description: language === 'th'
                ? 'รับผลิตสินค้าสมุนไพรและเครื่องสำอางตามแบรนด์ของคุณ ออกแบบสูตร, บรรจุภัณฑ์, ผลิตตามมาตรฐาน GMP'
                : language === 'en'
                    ? 'Custom herbal and cosmetic products for your brand. Formula design, packaging, and GMP-certified production.'
                    : '为您的品牌定制草药和化妆品。配方设计、包装和GMP认证生产。',
            link: '/oem'
        },
        {
            icon: '/images/service-products.png',
            title: language === 'th' ? 'จำหน่าย' : language === 'en' ? 'Products' : '产品销售',
            description: language === 'th'
                ? 'จำหน่ายผลิตภัณฑ์สมุนไพรคุณภาพสูง ทั้งปลีกและส่ง พร้อมบริการจัดส่งทั่วประเทศ'
                : language === 'en'
                    ? 'High-quality herbal products, retail and wholesale. Nationwide delivery service.'
                    : '高品质草药产品，零售和批发。全国配送服务。',
            link: '/products'
        },
        {
            icon: '/images/service-registration.png',
            title: language === 'th' ? 'ขึ้นทะเบียน' : language === 'en' ? 'Registration' : '注册服务',
            description: language === 'th'
                ? 'จดทะเบียน อย., ขึ้นทะเบียน GMP, จด อ.ย., ขอใบอนุญาตผลิต, ออกแบบแบรนด์และบรรจุภัณฑ์ครบวงจร'
                : language === 'en'
                    ? 'FDA registration, GMP certification, production licenses, complete brand and packaging design.'
                    : 'FDA注册、GMP认证、生产许可证、完整的品牌和包装设计。',
            link: '/contact'
        }
    ];

    const services = getServices();

    const certContainerRef = useRef(null);
    const fbContainerRef = useRef(null);

    const scrollCert = (direction) => {
        const container = certContainerRef.current;
        if (container) {
            // Scroll by exactly the visible width of the container so it pages exactly
            const scrollAmount = container.clientWidth;
            const newPosition = direction === 'left'
                ? Math.max(0, container.scrollLeft - scrollAmount)
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollFb = (direction) => {
        const container = fbContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth;
            const newPosition = direction === 'left'
                ? Math.max(0, container.scrollLeft - scrollAmount)
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
        }
    };

    const certImages = [
        '/images/certificate/certificate_1.png',
        '/images/certificate/certificate_2.png',

        '/images/certificate/certificate_3.jpg',
        '/images/certificate/certificate_4.png',
        '/images/certificate/certificate_5.png',
        '/images/certificate/certificate_6.png',
        '/images/certificate/certificate_7.png',
        '/images/certificate/certificate_8.png',
        '/images/certificate/certificate_9.jpg',
        '/images/certificate/certificate_10.png',
        '/images/certificate/certificate_11.png',
        '/images/certificate/certificate_12.png',
        '/images/certificate/certificate_13.png',
        '/images/certificate/certificate_14.png',
        '/images/certificate/certificate_15.png',
        '/images/certificate/certificate_16.png',
        '/images/certificate/certificate_17.png',
        '/images/certificate/certificate_18.png',
        '/images/certificate/certificate_19.png',
        '/images/certificate/certificate_20.png',
        '/images/certificate/certificate_21.png',
        '/images/certificate/certificate_22.png',
        '/images/certificate/certificate_23.png',
        '/images/certificate/certificate_24.png',
        '/images/certificate/certificate_25.JPG',
        '/images/certificate/certificate_26.JPG',
        '/images/certificate/certificate_27.JPG',
        '/images/certificate/certificate_28.JPG',
        '/images/certificate/certificate_29.jpg',
        '/images/certificate/certificate_30.jpg',
        '/images/certificate/certificate_31.jpg'
    ];

    return (
        <div className="home-page">
            {/* Hero Section - Unified Design */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-glass-card">
                            <h1>
                                <span className="d-block animate-slide-in delay-1">
                                    {language === 'th' ? 'วิสาหกิจชุมชน' : language === 'en' ? 'Community Enterprise' : '社区企业'}
                                </span>
                                <span className="text-white d-block animate-slide-in delay-2">
                                    {language === 'th' ? 'ไทย เฮิร์บ เซ็นเตอร์' : language === 'en' ? 'Thai Herb Centers' : '泰国草药中心'}
                                </span>
                                <span className="text-white d-block animate-slide-in delay-3">THAI HERB CENTERS</span>
                            </h1>

                            <p className="hero-description">
                                <span className="hero-subtitle-box">
                                    {language === 'th' ? 'โรงงานผลิตสมุนไพร มาตรฐานระดับสากล'
                                        : language === 'en' ? 'International Standard Herbal Manufacturing'
                                            : '国际标准草药制造厂'}
                                </span>
                                <br />

                            </p>


                            {/* Certifications Banner */}
                            <div className="hero-certifications">
                                <img
                                    src="/images/certifications-banner.png"
                                    alt={language === 'th' ? 'ได้รับมาตรฐาน GMP, OTOP, Green Industry'
                                        : language === 'en' ? 'GMP, OTOP, Green Industry Certified'
                                            : 'GMP、OTOP、绿色工业认证'}
                                    className="cert-banner-img animate-glow delay-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Slider */}
            <ImageSlider />

            {/* Standards Section */}
            <Standards />

            {/* Certifications Section */}
            <section className="certifications-section section">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            {language === 'th' ? 'ใบรับรอง' : language === 'en' ? 'Certifications' : '认证证书'}
                            <span>{language === 'th' ? 'มาตรฐาน' : language === 'en' ? 'Standards' : '标准'}</span>
                        </h2>
                    </div>

                    <div className="cert-carousel-wrapper">
                        <button
                            className="cert-nav-btn cert-nav-prev"
                            onClick={() => scrollCert('left')}
                            aria-label="Previous Certificate"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="cert-carousel" ref={certContainerRef}>
                            {certImages.map((img, index) => (
                                <div key={index} className="cert-item" onClick={() => setSelectedImage(img)} style={{ cursor: 'pointer' }}>
                                    <img src={img} alt={`Certificate ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        <button
                            className="cert-nav-btn cert-nav-next"
                            onClick={() => scrollCert('right')}
                            aria-label="Next Certificate"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services section">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            {language === 'th' ? 'บริการของ' : language === 'en' ? 'Our' : '我们的'}
                            <span>{language === 'th' ? 'เรา' : language === 'en' ? 'Services' : '服务'}</span>
                        </h2>
                    </div>

                    <div className="services-list">
                        {services.map((service, index) => (
                            <div key={index} className="service-item">
                                <div className="service-left">
                                    <h3>{service.title}</h3>
                                    <div className="service-icon">
                                        {service.icon.startsWith('/') ? (
                                            <img src={service.icon} alt={service.title} />
                                        ) : (
                                            service.icon
                                        )}
                                    </div>
                                </div>
                                <div className="service-right">
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News and Activities Section - Facebook Page */}
            <section className="news-activities section">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            {language === 'th' ? 'ข่าวสารและ' : language === 'en' ? 'News &' : '新闻'}
                            <span>{language === 'th' ? 'กิจกรรม' : language === 'en' ? 'Activities' : '活动'}</span>
                        </h2>
                    </div>

                    <div className="facebook-carousel-wrapper">
                        <button
                            className="fb-nav-btn fb-nav-prev"
                            onClick={() => scrollFb('left')}
                            aria-label="Previous Post"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="facebook-feed-container" ref={fbContainerRef}>
                            {fbLoading ? (
                                <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: '#888' }}>กำลังโหลดข่าวสารล่าสุด...</div>
                            ) : facebookPosts.length > 0 ? (
                                facebookPosts.slice(0, 10).map((post) => {
                                    const dateStr = new Date(post.created_time).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    });
                                    return (
                                        <div className="news-card" key={post.id} style={{ textDecoration: 'none' }}>
                                            <div className="news-card-image">
                                                {post.isVideo ? (
                                                    <iframe 
                                                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(post.permalink_url)}&show_text=false`} 
                                                        width="100%" 
                                                        height="100%" 
                                                        style={{ border: 'none', overflow: 'hidden', height: '100%', display: 'block' }} 
                                                        scrolling="no" 
                                                        frameBorder="0" 
                                                        allowFullScreen={true} 
                                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                                                    </iframe>
                                                ) : post.full_picture ? (
                                                    <img src={post.full_picture} alt="News" loading="lazy" />
                                                ) : (
                                                    <div style={{ background: '#f5f5f5', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>THAI HERB</div>
                                                )}
                                                {!post.isVideo && (
                                                    <div className="news-category">
                                                        {language === 'th' ? 'ข่าวใหม่' : 'NEW'}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="news-card-content">
                                                <span className="news-date">{dateStr}</span>
                                                <h3>
                                                     {post.message ? (post.message.length > 70 ? post.message.substring(0, 70) + '...' : post.message) : 'ติดตามข่าวสารและกิจกรรมล่าสุดจากหน้าเพจ'}
                                                </h3>
                                                <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px', fontSize: '0.9rem', color: '#1877F2', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                    เปิดใน Facebook
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: '#888' }}>ยังไม่มีข่าวสารใหม่</div>
                            )}
                        </div>

                        <button
                            className="fb-nav-btn fb-nav-next"
                            onClick={() => scrollFb('right')}
                            aria-label="Next Post"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <div className="cta-box">
                        <h2>
                            {language === 'th' ? 'สนใจสร้างแบรนด์สมุนไพรของคุณ?'
                                : language === 'en' ? 'Interested in creating your herbal brand?'
                                    : '想创建您的草药品牌吗？'}
                        </h2>
                        <p>
                            {language === 'th' ? 'ติดต่อเราเพื่อรับคำปรึกษาฟรี'
                                : language === 'en' ? 'Contact us for free consultation'
                                    : '联系我们获取免费咨询'}
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            {t('navbar.contact')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Image Modal (Lightbox) */}
            {selectedImage && (
                <div className="image-lightbox-modal" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
                        <img src={selectedImage} alt="Full Screen Certificate" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
