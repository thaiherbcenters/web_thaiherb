import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './Documents.css';

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

const Documents = () => {
    const { t, language } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [visibleCerts, setVisibleCerts] = useState(8);
    const [visibleRecipes, setVisibleRecipes] = useState(8);

    const handleLoadMore = () => {
        setVisibleCerts(prev => Math.min(prev + 8, certImages.length));
    };

    const handleLoadMoreRecipes = () => {
        setVisibleRecipes(prev => Math.min(prev + 8, 19));
    };

    // Placeholder or path for new document images
    // If exact images are not uploaded yet, we show a placeholder. 
    // They can simply replace these paths later.
    const enterpriseDocs = [
        {
            id: 'registration',
            title: t('documents.section2.subs.registration'),
            img: '/images/certificate/doc_registration.jpg' // Placeholder path
        },
        {
            id: 'commercial',
            title: t('documents.section2.subs.commercial'),
            img: '/images/certificate/doc_commercial.jpg'
        },
        {
            id: 'production',
            title: t('documents.section2.subs.production'),
            img: '/images/certificate/doc_production.jpg'
        },
        {
            id: 'distribution',
            title: t('documents.section2.subs.distribution'),
            img: '/images/certificate/doc_distribution.jpg'
        }
    ];

    // สร้างอาเรย์รูปภาพใบสำคัญการขึ้นทะเบียนตำรับจำนวน 19 ภาพ
    const recipeImages = Array.from({ length: 19 }, (_, i) => `/images/certificate/recipe_${i + 1}.jpg`);

    const fallbackImg = (e) => {
        // If image not found, use a placeholder
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='550' viewBox='0 0 400 550'%3E%3Crect width='400' height='550' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%2394a3b8'%3Eรอรูปภาพ / Image Here%3C/text%3E%3C/svg%3E";
    };

    return (
        <div className="documents-page page">
            {/* Hero Section */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge slide-text slide-0">
                        {t('documents.hero.badge')}
                    </span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        {t('documents.hero.title')}
                        <span className="text-blue">
                            {t('documents.hero.highlight')}
                        </span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {t('documents.hero.description')}
                    </p>
                </div>
            </section>

            {/* Section 1: Standard Certificates */}
            <section className="documents-section section-standards">
                <div className="container">
                    <div className="section-header">
                        <h2>{t('documents.section1.title')}</h2>
                        <div className="header-line"></div>
                    </div>
                    
                    <div className="cert-grid">
                        {certImages.slice(0, visibleCerts).map((img, index) => (
                            <div 
                                key={index} 
                                className="cert-card" 
                                onClick={() => setSelectedImage(img)}
                            >
                                <div className="cert-image-wrapper">
                                    <img src={img} alt={`Certificate ${index + 1}`} loading="lazy" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="load-more-container">
                        {visibleCerts < certImages.length ? (
                            <button className="btn-load-more" onClick={handleLoadMore}>
                                {language === 'th' ? 'ดูเพิ่มเติม' : language === 'en' ? 'Load More' : '看更多'}
                            </button>
                        ) : (
                            <button className="btn-load-more" onClick={() => {
                                setVisibleCerts(8);
                                window.scrollTo({ top: document.querySelector('.section-standards').offsetTop, behavior: 'smooth' });
                            }}>
                                {language === 'th' ? 'ซ่อนรูปภาพ' : language === 'en' ? 'Show Less' : '收缩图片'}
                            </button>
                        )}
                    </div>
                    
                    <div className="doc-count-text">
                        {language === 'th' 
                            ? `แสดง ${Math.min(visibleCerts, certImages.length)} จากทั้งหมด ${certImages.length} รายการ`
                            : language === 'en'
                                ? `Showing ${Math.min(visibleCerts, certImages.length)} of ${certImages.length} items`
                                : `显示 ${Math.min(visibleCerts, certImages.length)} / ${certImages.length} 项`
                        }
                    </div>
                </div>
            </section>

            {/* Section 2: Enterprise Documents */}
            <section className="documents-section section-enterprise bg-light">
                <div className="container">
                    <div className="section-header">
                        <h2>{t('documents.section2.title')}</h2>
                        <div className="header-line"></div>
                    </div>

                    <div className="enterprise-docs-grid">
                        {enterpriseDocs.map((doc, index) => (
                            <div 
                                key={index} 
                                className="cert-card enterprise-card"
                                onClick={() => setSelectedImage(doc.img)}
                            >
                                <div className="cert-image-wrapper">
                                    <img src={doc.img} alt={doc.title} onError={fallbackImg} loading="lazy" />
                                </div>
                                <div className="cert-title">
                                    <h3>{doc.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Recipe Registration Documents */}
            <section className="documents-section section-recipe">
                <div className="container">
                    <div className="section-header">
                        <h2>{t('documents.section2.subs.formulary')}</h2>
                        <div className="header-line"></div>
                    </div>

                    <div className="cert-grid">
                        {recipeImages.slice(0, visibleRecipes).map((img, index) => (
                            <div 
                                key={index} 
                                className="cert-card" 
                                onClick={() => setSelectedImage(img)}
                            >
                                <div className="cert-image-wrapper">
                                    <img src={img} alt={`Recipe Certificate ${index + 1}`} onError={fallbackImg} loading="lazy" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="load-more-container">
                        {visibleRecipes < recipeImages.length ? (
                            <button className="btn-load-more" onClick={handleLoadMoreRecipes}>
                                {language === 'th' ? 'ดูเพิ่มเติม' : language === 'en' ? 'Load More' : '看更多'}
                            </button>
                        ) : (
                            <button className="btn-load-more" onClick={() => {
                                setVisibleRecipes(8);
                                window.scrollTo({ top: document.querySelector('.section-recipe').offsetTop, behavior: 'smooth' });
                            }}>
                                {language === 'th' ? 'ซ่อนรูปภาพ' : language === 'en' ? 'Show Less' : '收缩图片'}
                            </button>
                        )}
                    </div>
                    
                    <div className="doc-count-text">
                        {language === 'th' 
                            ? `แสดง ${Math.min(visibleRecipes, recipeImages.length)} จากทั้งหมด ${recipeImages.length} รายการ`
                            : language === 'en'
                                ? `Showing ${Math.min(visibleRecipes, recipeImages.length)} of ${recipeImages.length} items`
                                : `显示 ${Math.min(visibleRecipes, recipeImages.length)} / ${recipeImages.length} 项`
                        }
                    </div>
                </div>
            </section>

            {/* Lightbox for zooming photos */}
            {selectedImage && (
                <div className="doc-lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
                        <img src={selectedImage} alt="Document Zoom" onError={fallbackImg} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
