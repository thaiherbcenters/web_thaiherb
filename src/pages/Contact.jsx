import { useTranslation } from '../hooks/useTranslation';
import './Contact.css';

const Contact = () => {
    const { t, language } = useTranslation();

    const getContactInfo = () => [
        {
            icon: '📍',
            title: language === 'th' ? 'ที่อยู่' : language === 'en' ? 'Address' : '地址',
            content: ['6/8 หมู่ที่ 2 ต.ไทรม้า อ.เมืองนนทบุรี จ.นนทบุรี 11000']
        },
        {
            icon: '📞',
            title: language === 'th' ? 'เบอร์โทรศัพท์' : language === 'en' ? 'Phone' : '电话',
            content: ['08-3979-9389', '06-3689-9798']
        },
        {
            icon: '📧',
            title: language === 'th' ? 'อีเมล' : language === 'en' ? 'Email' : '电子邮件',
            content: ['Thaiherbcenters@gmail.com']
        },
        {
            icon: '🕐',
            title: language === 'th' ? 'เวลาทำการ' : language === 'en' ? 'Working Hours' : '工作时间',
            content: language === 'th'
                ? ['จันทร์ - ศุกร์: 8:00 - 17:00', 'เสาร์: 9:00 - 12:00']
                : language === 'en'
                    ? ['Mon - Fri: 8:00 - 17:00', 'Sat: 9:00 - 12:00']
                    : ['周一至周五: 8:00 - 17:00', '周六: 9:00 - 12:00']
        }
    ];

    const contactInfo = getContactInfo();

    return (
        <div className="contact-page page">
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge slide-text slide-0">{t('contact.hero.badge')}</span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        {language === 'th' ? 'ติดต่อเรา' : language === 'en' ? 'Contact' : '联系'} <span className="text-blue">{language === 'th' ? 'US' : language === 'en' ? 'US' : '我们'}</span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {t('contact.hero.description')}
                    </p>

                </div>
            </section>

            <div className="container section">
                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <div className="form-header">
                            <h3>{t('contact.form.title')}</h3>
                            <p>{t('contact.form.subtitle')}</p>
                        </div>
                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('contact.form.name')}</label>
                                    <input type="text" placeholder={t('contact.form.name')} />
                                </div>
                                <div className="form-group">
                                    <label>{t('contact.form.phone')}</label>
                                    <input type="tel" placeholder={t('contact.form.phone')} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{t('contact.form.email')}</label>
                                <input type="email" placeholder={t('contact.form.email')} />
                            </div>
                            <div className="form-group">
                                <label>{t('contact.form.subject')}</label>
                                <select>
                                    <option>{t('contact.form.subjects.general')}</option>
                                    <option>{t('contact.form.subjects.products')}</option>
                                    <option>{t('contact.form.subjects.oem')}</option>
                                    <option>{t('contact.form.subjects.training')}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{t('contact.form.message')}</label>
                                <textarea placeholder={t('contact.form.message') + '...'}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">
                                {t('contact.form.submit')}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info-wrapper">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="contact-info-card card">
                                <div className="info-icon">{info.icon}</div>
                                <div className="info-content">
                                    <h4>{info.title}</h4>
                                    {info.content.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="contact-social">
                            <h4>{t('contact.social.title')}</h4>
                            <div className="social-links">
                                <a href="https://line.me/R/ti/p/@ponpri" target="_blank" rel="noopener noreferrer" className="social-link line">
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975 2.569-2.946 2.548-3.048 2.548-5.968z" /></svg>
                                </a>
                                <a href="https://www.facebook.com/thccenters" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="https://www.tiktok.com/@tawat_88" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div className="contact-map card">
                            <iframe
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=VFJC%2BR4+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B9%84%E0%B8%97%E0%B8%A3%E0%B8%A1%E0%B9%89%E0%B8%B2+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5+%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5&zoom=17"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                            <a href="https://maps.google.com/?q=VFJC%2BR4+%E0%B9%84%E0%B8%97%E0%B8%A3%E0%B8%A1%E0%B9%89%E0%B8%B2+%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5" target="_blank" rel="noopener noreferrer" className="btn btn-outline map-btn">
                                {t('contact.map.button')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

