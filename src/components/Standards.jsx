import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './Standards.css';

const Standards = () => {
    const { language } = useTranslation();
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [isTopImageVisible, setIsTopImageVisible] = useState(false);
    const itemRefs = useRef([]);
    const topImageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setVisibleItems((prev) => {
                            const newSet = new Set(prev);
                            newSet.add(index);
                            return newSet;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        const topImageObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsTopImageVisible(true);
                    topImageObserver.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (topImageRef.current) {
            topImageObserver.observe(topImageRef.current);
        }

        return () => {
            observer.disconnect();
            topImageObserver.disconnect();
        };
    }, []);

    // Quote translations
    const getQuote = () => {
        if (language === 'th') {
            return [
                '" พัฒนาองค์ความรู้',
                'เชิดชูสมุนไพรไทย',
                'ใส่ใจบริการมวลชน',
                'ก้าวสู่สากลอย่างยั่งยืน "'
            ];
        } else if (language === 'en') {
            return [
                '" Developing knowledge,',
                'honoring Thai herbs,',
                'serving the public with care,',
                'stepping into the global stage sustainably "'
            ];
        } else {
            return [
                '" 发展知识，',
                '弘扬泰国草药，',
                '关心公众服务，',
                '可持续走向国际 "'
            ];
        }
    };

    // Profile translations
    const getCompanySubtitle = () => {
        if (language === 'th') return 'ไทยเฮิร์บเซ็นเตอร์/';
        if (language === 'en') return 'Thai Herb Centers/';
        return '泰国草药中心/';
    };

    const getProfile = () => ({
        name: 'ธวัช จรุงพิรวงศ์',
        titles: language === 'th' ? [
            'ประธานวิสาหกิจชุมชนไทยเฮิร์บเซ็นเตอร์',
            'ที่ปรึกษาสถาบันการแพทย์แผนไทย',
            'กรรมการผลักดันสมุนไพรไทยไปสู่ตลาดโลก'
        ] : language === 'en' ? [
            'Chairman of Thai Herb Centers Community Enterprise',
            'Advisor to the Institute of Thai Traditional Medicine',
            'Committee Member for Thai Herbal Global Market Expansion'
        ] : [
            '泰国草药中心社区企业主席',
            '泰国传统医学研究所顾问',
            '推动泰国草药走向世界市场委员会成员'
        ]
    });

    // Standards header translations
    const getStandardsHeader = () => ({
        title: language === 'th' ? 'มาตรฐานโรงงาน' : language === 'en' ? 'Factory' : '工厂',
        highlight: language === 'th' ? 'ระดับสากล' : language === 'en' ? 'Standards' : '标准',
        description: language === 'th'
            ? 'เรามุ่งมั่นพัฒนากระบวนการผลิตด้วยวิธีการที่สะอาด ปลอดภัย และได้มาตรฐานสากล เพื่อส่งมอบผลิตภัณฑ์สมุนไพรคุณภาพสูงให้กับผู้บริโภค'
            : language === 'en'
                ? 'We are committed to developing production processes that are clean, safe, and meet international standards to deliver high-quality herbal products to consumers.'
                : '我们致力于开发清洁、安全、符合国际标准的生产工艺，为消费者提供高品质的草药产品。'
    });

    const getStandardsList = () => [
        {
            icon: <img src="/images/ttm_logo.png" alt="Thailand Trust Mark" />,
            title: 'Thailand Trust Mark',
            description: language === 'th' ? 'สัญลักษณ์แห่งความเป็นเลิศและความเชื่อมั่นในคุณภาพสินค้าไทย'
                : language === 'en' ? 'Symbol of excellence and confidence in Thai product quality'
                    : '泰国产品质量卓越和信心的象征'
        },
        {
            icon: <img src="/images/gmp_logo.png" alt="GMP Certified" />,
            title: 'GMP Certified',
            description: language === 'th' ? 'หลักเกณฑ์วิธีการที่ดีในการผลิตอาหารและยา ปลอดภัยตามมาตรฐานสากล'
                : language === 'en' ? 'Good Manufacturing Practice for food and drug safety to international standards'
                    : '符合国际标准的食品和药品生产良好规范'
        },
        {
            icon: <img src="/images/green_industry_logo.png" alt="Green Industry" />,
            title: 'Green Industry',
            description: language === 'th' ? 'อุตสาหกรรมสีเขียว ระดับที่ 2 เป็นมิตรกับชุมชนและสิ่งแวดล้อม'
                : language === 'en' ? 'Green Industry Level 2, environmentally and community friendly'
                    : '绿色工业二级，对社区和环境友好'
        },
        {
            icon: <img src="/images/tls_logo.png" alt="TLS 8001" />,
            title: 'TLS 8001',
            description: language === 'th' ? 'มาตรฐานแรงงานไทย (Thai Labour Standard)'
                : language === 'en' ? 'Thai Labour Standard certification'
                    : '泰国劳工标准认证'
        },
        {
            icon: <img src="/images/mit_logo.png" alt="Made in Thailand" />,
            title: 'Made in Thailand',
            description: language === 'th' ? 'สินค้ามาตรฐานที่ผลิตในประเทศไทย'
                : language === 'en' ? 'Quality products manufactured in Thailand'
                    : '泰国制造的优质产品'
        },
        {
            icon: <img src="/images/otop_logo.png" alt="OTOP 5 Stars" />,
            title: 'OTOP 5 Stars',
            description: language === 'th' ? 'สินค้าหนึ่งตำบล หนึ่งผลิตภัณฑ์ ระดับ 5 ดาว'
                : language === 'en' ? 'One Tambon One Product, 5-star rating'
                    : '一村一品，五星级产品'
        },
        {
            icon: <img src="/images/halal_logo.png" alt="Halal Certified" />,
            title: 'Halal Certified',
            description: language === 'th' ? 'ได้รับการรับรองมาตรฐานฮาลาล ถูกต้องตามหลักศาสนาอิสลาม'
                : language === 'en' ? 'Halal certified according to Islamic principles'
                    : '符合伊斯兰教法的清真认证'
        },
        {
            icon: <img src="/images/php_logo.png" alt="Premium Herbal Products" />,
            title: 'Premium Herbal Products',
            description: language === 'th' ? 'ผลิตภัณฑ์สมุนไพรคุณภาพ (Premium Herbal Products)'
                : language === 'en' ? 'Premium quality herbal products certification'
                    : '优质草药产品认证'
        },
        {
            icon: <img src="/images/iso9001_logo.png" alt="ISO 9001:2015" />,
            title: 'ISO 9001:2015',
            description: language === 'th' ? 'ระบบบริหารงานคุณภาพมาตรฐานสากล'
                : language === 'en' ? 'International quality management system standard'
                    : '国际质量管理体系标准'
        },
        {
            icon: <img src="/images/iso14001_logo.png" alt="ISO 14001:2015" />,
            title: 'ISO 14001:2015',
            description: language === 'th' ? 'มาตรฐานระบบการจัดการสิ่งแวดล้อม'
                : language === 'en' ? 'Environmental management system standard'
                    : '环境管理体系标准'
        }
    ];

    const standardsList = getStandardsList();
    const profile = getProfile();
    const header = getStandardsHeader();

    return (
        <section className="standards-section">
            <div className="container">
                {/* Top Image Animation */}
                {/* Top Section: Quote and Image */}
                <div
                    className={`standards-top-section ${isTopImageVisible ? 'visible' : ''}`}
                    ref={topImageRef}
                >
                    <div className="standards-top-bg"></div>
                    <div className="standards-top-inner">
                        <div className="standards-info-col">
                            <span className="standards-company-subtitle">{getCompanySubtitle()}</span>
                            <div className="standards-quote">
                                <blockquote>
                                    {getQuote().map((line, i) => (
                                        <span key={i} className="quote-line">{line}</span>
                                    ))}
                                </blockquote>
                            </div>
                            <div className="standards-profile">
                                <h3>{profile.name}</h3>
                                <div className="profile-details">
                                    {profile.titles.map((title, index) => (
                                        <p key={index}>{title}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="standards-hero-image">
                            <img src="/images/ceo_award.png?v=2" alt="CEO Awards and Certification" />
                        </div>
                    </div>
                </div>

                <div className="standards-container">
                    {/* Left Column: Image */}
                    <div className="standards-image-stack">
                        <img src="/images/standards_1.JPG" alt="Factory Standards 1" loading="lazy" />
                        <img src="/images/standards_2.JPG" alt="Factory Standards 2" loading="lazy" />
                        <img src="/images/standards_3.png" alt="Factory Standards 3" loading="lazy" />
                    </div>

                    {/* Right Column: Content */}
                    <div className="standards-content">
                        <div className="standards-header">
                            <h2>{header.title} <span className="text-blue">{header.highlight}</span></h2>
                            <p>{header.description}</p>
                        </div>

                        <div className="standards-grid">
                            {standardsList.map((item, index) => (
                                <div
                                    className={`standard-item ${visibleItems.has(index) ? 'visible' : ''}`}
                                    key={index}
                                    data-index={index}
                                    ref={(el) => (itemRefs.current[index] = el)}
                                    style={{ transitionDelay: `${(index % 2) * 0.1}s` }} /* Slight stagger for row pairs */
                                >
                                    <div className="std-icon">
                                        {item.icon}
                                    </div>
                                    <div className="std-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Standards;

