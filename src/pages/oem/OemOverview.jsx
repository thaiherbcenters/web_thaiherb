import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useEffect, useRef, useState } from 'react';
import './OemOverview.css';


const OemOverview = () => {
    const { language } = useTranslation();
    const [areServicesVisible, setAreServicesVisible] = useState(false);
    const servicesRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAreServicesVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (servicesRef.current) {
            observer.observe(servicesRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Services with translations
    const getServices = () => [
        {
            icon: '/images/oem-consult.png',
            title: language === 'th' ? 'ให้คำปรึกษา' : language === 'en' ? 'Consultation' : '咨询服务',
            description: language === 'th'
                ? 'บริการให้คำแนะนำและให้คำปรึกษาเริ่มตั้งแต่การปลูกสมุนไพร การคัดเลือกสายพันธุ์สมุนไพรให้กับเจ้าของแบรนด์'
                : language === 'en'
                    ? 'We provide guidance and consultation from herb cultivation and selection of herb varieties for brand owners.'
                    : '我们为品牌所有者提供从草药种植到草药品种选择的指导和咨询服务。',
            details: language === 'th'
                ? ['วิเคราะห์ความต้องการ', 'แนะนำแนวทางธุรกิจ', 'วางแผนการตลาด', 'ปรึกษาฟรีไม่มีค่าใช้จ่าย']
                : language === 'en'
                    ? ['Needs Analysis', 'Business Guidance', 'Marketing Planning', 'Free Consultation']
                    : ['需求分析', '商业指导', '营销规划', '免费咨询']
        },
        {
            icon: '/images/oem-formula.JPG',
            title: language === 'th' ? 'ผลิตสูตรและกลิ่น' : language === 'en' ? 'Formula & Scent Development' : '配方与香味开发',
            description: language === 'th'
                ? 'พัฒนาสูตรผลิตภัณฑ์และกลิ่นเฉพาะตามความต้องการของแบรนด์คุณ'
                : language === 'en'
                    ? 'Develop product formulas and custom scents according to your brand requirements.'
                    : '根据您的品牌需求开发产品配方和定制香味。',
            details: language === 'th'
                ? ['วิจัยและพัฒนาสูตรใหม่', 'สร้างกลิ่นเฉพาะแบรนด์', 'ทดสอบคุณภาพและความคงตัว', 'ปรับสูตรตามความต้องการ']
                : language === 'en'
                    ? ['R&D for New Formulas', 'Custom Brand Scents', 'Quality & Stability Testing', 'Formula Customization']
                    : ['新配方研发', '品牌定制香味', '质量稳定性测试', '配方定制']
        },
        {
            icon: '/images/oem-register.png',
            title: language === 'th' ? 'ขึ้นทะเบียน' : language === 'en' ? 'Registration' : '注册服务',
            description: language === 'th'
                ? 'ดำเนินการขึ้นทะเบียน อย. GMP และหน่วยงานที่เกี่ยวข้องให้ครบวงจร'
                : language === 'en'
                    ? 'Complete FDA, GMP registration and related agency certifications.'
                    : '完整的FDA、GMP注册及相关机构认证服务。',
            details: language === 'th'
                ? ['จดทะเบียน อย.', 'ขึ้นทะเบียน GMP', 'เตรียมเอกสารทั้งหมด', 'ติดตามสถานะให้']
                : language === 'en'
                    ? ['FDA Registration', 'GMP Certification', 'Document Preparation', 'Status Tracking']
                    : ['FDA注册', 'GMP认证', '文件准备', '状态跟踪']
        },
        {
            icon: '/images/oem-packaging.jpg',
            title: language === 'th' ? 'ออกแบบบรรจุภัณฑ์' : language === 'en' ? 'Packaging Design' : '包装设计',
            description: language === 'th'
                ? 'บริการออกแบบบรรจุภัณฑ์และฉลากผลิตภัณฑ์โดยทีมดีไซน์มืออาชีพ'
                : language === 'en'
                    ? 'Professional packaging and label design services by our expert design team.'
                    : '由我们专业设计团队提供包装和标签设计服务。',
            details: language === 'th'
                ? ['ออกแบบฉลากและกล่อง', 'ออกแบบโลโก้แบรนด์', 'พิมพ์บรรจุภัณฑ์คุณภาพสูง', 'แก้ไขไม่จำกัดครั้ง']
                : language === 'en'
                    ? ['Label & Box Design', 'Brand Logo Design', 'High-Quality Printing', 'Unlimited Revisions']
                    : ['标签和包装盒设计', '品牌标志设计', '高质量印刷', '无限次修改']
        },
        {
            icon: '/images/oem-training.png',
            title: language === 'th' ? 'อบรมการจำหน่ายสินค้า' : language === 'en' ? 'Sales Training' : '销售培训',
            description: language === 'th'
                ? 'อบรมเทคนิคการขายและการทำตลาดสินค้าให้ประสบความสำเร็จ'
                : language === 'en'
                    ? 'Training on sales techniques and marketing for successful product distribution.'
                    : '销售技巧和营销培训，帮助产品成功销售。',
            details: language === 'th'
                ? ['เทคนิคการขาย', 'การทำตลาดออนไลน์', 'สร้างเครือข่ายตัวแทน', 'พัฒนาทักษะธุรกิจ']
                : language === 'en'
                    ? ['Sales Techniques', 'Online Marketing', 'Build Agent Network', 'Business Skill Development']
                    : ['销售技巧', '网络营销', '建立代理网络', '商业技能发展']
        },
    ];

    const services = getServices();

    const productTypes = [
        { icon: '💊', name: language === 'th' ? 'แคปซูลสมุนไพร' : language === 'en' ? 'Herbal Capsules' : '草药胶囊' },
        { icon: '💧', name: language === 'th' ? 'น้ำมันสมุนไพร' : language === 'en' ? 'Herbal Oils' : '草药油' },
        { icon: '🍵', name: language === 'th' ? 'ชาสมุนไพร' : language === 'en' ? 'Herbal Tea' : '草药茶' },
        { icon: '🧴', name: language === 'th' ? 'ครีมและเจล' : language === 'en' ? 'Creams & Gels' : '霜和凝胶' },
        { icon: '🧪', name: language === 'th' ? 'สารสกัดเข้มข้น' : language === 'en' ? 'Concentrated Extracts' : '浓缩萃取' },
        { icon: '🥤', name: language === 'th' ? 'เครื่องดื่มสมุนไพร' : language === 'en' ? 'Herbal Beverages' : '草药饮料' },
        { icon: '💎', name: language === 'th' ? 'ผลิตภัณฑ์พรีเมียม' : language === 'en' ? 'Premium Products' : '高端产品' },
        { icon: '🌿', name: language === 'th' ? 'ผงสมุนไพร' : language === 'en' ? 'Herbal Powder' : '草药粉' },
    ];



    const certifications = [
        { name: 'GMP', description: 'Good Manufacturing Practice' },
        { name: language === 'th' ? 'อย.' : 'FDA', description: language === 'th' ? 'สำนักงานคณะกรรมการอาหารและยา' : language === 'en' ? 'Food and Drug Administration' : '食品药品监督管理局' },
        { name: 'HACCP', description: 'Hazard Analysis Critical Control Point' },
        { name: 'ISO 22000', description: 'Food Safety Management' },
    ];

    return (
        <div className="oem-overview-page page">
            {/* Hero Section */}


            {/* Hero Section */}
            <section className="page-hero oem-hero">
                <div className="container page-hero-content">
                    <span className="oem-service-badge slide-text slide-0">OEM Service</span>
                    <h1 className="oem-hero-title">
                        <span className="slide-text slide-1">
                            {language === 'th' ? 'รับผลิตสินค้าสมุนไพร เเละ เครื่องสำอาง'
                                : language === 'en' ? 'Herbal & Cosmetic Products Manufacturing'
                                    : '草药及化妆品生产'}
                        </span>
                        <span className="slide-text slide-2 text-blue">
                            {language === 'th' ? 'มาตรฐานระดับสากล'
                                : language === 'en' ? 'International Standards'
                                    : '国际标准'}
                        </span>
                    </h1>
                    <div className="oem-hero-subtitle">
                        <p className="slide-text slide-3">
                            {language === 'th' ? 'เจ้าของแบรนด์สมุนไพร ไม่ใช่เรื่องไกลตัวอีกต่อไป'
                                : language === 'en' ? 'Owning a herbal brand is no longer a distant dream'
                                    : '拥有草药品牌不再是遥不可及的梦想'}
                        </p>
                        <p className="slide-text slide-4 highlight-text">
                            {language === 'th' ? '"ครบ จบ ใน ที่เดียว"'
                                : language === 'en' ? '"Complete solution in one place"'
                                    : '"一站式完整解决方案"'}
                        </p>
                        <span className="one-stop-badge slide-text slide-5">One Stop Service</span>
                    </div>
                </div>
            </section>








            {/* Services Section */}
            <section id="services" className="services-section section bg-soft">
                <div className="container">

                    <div className="services-grid grid grid-3" ref={servicesRef}>
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`service-card card ${areServicesVisible ? 'slide-up-card' : ''}`}
                                style={{
                                    animationDelay: `${index * 0.15}s`,
                                    opacity: areServicesVisible ? undefined : 0,
                                }}
                            >
                                <div className="service-icon">
                                    <img src={service.icon} alt={service.title} />
                                </div>
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

            {/* Production Process Section */}
            <section className="production-process-section section">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            {language === 'th' ? 'กระบวน' : language === 'en' ? 'Production' : '生产'}
                            <span>{language === 'th' ? 'การผลิต' : language === 'en' ? 'Process' : '流程'}</span>
                        </h2>
                        <p>
                            {language === 'th' ? 'ทันสมัย ปลอดภัย สะอาด ได้มาตรฐาน'
                                : language === 'en' ? 'Modern, Safe, Clean, and Certified'
                                    : '现代、安全、清洁、符合标准'}
                        </p>
                    </div>
                    <div className="production-images-grid">
                        <img src="/images/process/process-1.JPG" alt="Production 1" />
                        <img src="/images/process/process-2.JPG" alt="Production 2" />
                        <img src="/images/process/process-3.JPG" alt="Production 3" />
                        <img src="/images/process/process-4.JPG" alt="Production 4" />
                        <img src="/images/process/process-5.JPG" alt="Production 5" />
                        <img src="/images/process/process-6.JPG" alt="Production 6" />
                        <img src="/images/process/process-7.JPG" alt="Production 7" />
                        <img src="/images/process/process-8.JPG" alt="Production 8" />
                    </div>
                </div>
            </section>

            {/* Packaging Section */}
            <section className="packaging-section section bg-soft">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            {language === 'th' ? 'บรรจุ' : language === 'en' ? 'Packaging' : '包装'}
                            <span>{language === 'th' ? 'ภัณฑ์' : language === 'en' ? 'Options' : '选择'}</span>
                        </h2>
                        <p>
                            {language === 'th' ? 'รองรับบรรจุภัณฑ์หลากหลายรูปแบบ ทั้งขวดแก้วและขวดพลาสติก'
                                : language === 'en' ? 'Supporting various packaging formats including glass and plastic bottles'
                                    : '支持多种包装形式，包括玻璃瓶和塑料瓶'}
                        </p>
                    </div>
                    <div className="packaging-images-grid">
                        <img src="/images/packaging/packaging-1.JPG" alt="บรรจุภัณฑ์ 1" />
                        <img src="/images/packaging/packaging-2.JPG" alt="บรรจุภัณฑ์ 2" />
                        <img src="/images/packaging/packaging-3.JPG" alt="บรรจุภัณฑ์ 3" />
                        <img src="/images/packaging/packaging-4.JPG" alt="บรรจุภัณฑ์ 4" />

                    </div>
                </div>
            </section>

            {/* Graphic Design Section */}
            <section className="graphic-design-section section">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            {language === 'th' ? 'ออกแบบ' : language === 'en' ? 'Graphic' : '平面'}
                            <span>{language === 'th' ? 'บรรจุภัณฑ์' : language === 'en' ? 'Design' : '设计'}</span>
                        </h2>
                        <p>
                            {language === 'th' ? 'ออกแบบ ฉลาก ซอง กล่อง รวมไปถึงสื่อกราฟฟิกต่างๆ โดยทีมดีไซน์มืออาชีพ'
                                : language === 'en' ? 'Design labels, pouches, boxes and various graphic media by professional design team'
                                    : '由专业设计团队设计标签、袋子、盒子和各种平面媒体'}
                        </p>
                    </div>
                    <div className="graphic-design-grid">
                        <img src="/images/design/design-1.jpg" alt={language === 'th' ? 'ออกแบบฉลาก' : 'Label Design'} />
                        <img src="/images/design/design-2.jpg" alt={language === 'th' ? 'ออกแบบซอง' : 'Pouch Design'} />
                    </div>
                </div>
            </section>

            {/* Label Design Section */}
            <section className="label-design-section section">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            {language === 'th' ? 'สื่อโฆษณาเเละ' : language === 'en' ? 'Advertising &' : '广告与'}
                            <span>{language === 'th' ? 'อบรมการขาย' : language === 'en' ? 'Sales Training' : '销售培训'}</span>
                        </h2>
                        <p>
                            {language === 'th' ? 'บริการถ่ายภาพผลิตภัณฑ์ อบรมการขายออนไลน์ ห้อง Live สดที่ได้มาตรฐานให้กับลูกค้า'
                                : language === 'en' ? 'Product photography, online sales training, and professional live streaming studio for customers'
                                    : '产品摄影、在线销售培训以及为客户提供专业的直播工作室'}
                        </p>
                    </div>
                    <div className="label-images-grid">
                        <img src="/images/label/label-1.jpg" alt="ฉลากสินค้า 1" />
                        <img src="/images/label/label-2.JPG" alt="ฉลากสินค้า 2" />
                        <img src="/images/label/label-3.png" alt="ฉลากสินค้า 3" />
                        <img src="/images/label/label-4.JPG" alt="ฉลากสินค้า 4" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="oem-cta section">
                <div className="container">
                    <div className="oem-cta-card">
                        <div className="oem-cta-content">
                            <h2>
                                {language === 'th' ? 'พร้อมเริ่มต้นธุรกิจสมุนไพรของคุณ?'
                                    : language === 'en' ? 'Ready to start your herbal business?'
                                        : '准备好开始您的草药事业了吗？'}
                            </h2>
                            <p>
                                {language === 'th' ? 'ติดต่อเราวันนี้เพื่อปรึกษาฟรี! ทีมงานผู้เชี่ยวชาญพร้อมให้คำแนะนำ'
                                    : language === 'en' ? 'Contact us today for free consultation! Our expert team is ready to assist you.'
                                        : '今天就联系我们获取免费咨询！我们的专业团队随时为您提供指导。'}
                            </p>
                            <div className="cta-buttons">
                                <Link to="/contact" className="btn btn-primary">
                                    {language === 'th' ? 'ติดต่อเรา' : language === 'en' ? 'Contact Us' : '联系我们'}
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
