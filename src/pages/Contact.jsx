import './Contact.css';

const Contact = () => {
    const contactInfo = [
        {
            icon: '📍',
            title: 'ที่อยู่',
            content: ['เลขที่ 6/10 หมู่ที่ 2 ตำบลไทรม้า อำเภอเมืองนนทบุรี 11000, Nonthaburi, Thailand, 11000']
        },
        {
            icon: '📞',
            title: 'โทรศัพท์',
            content: ['083 979 9389']
        },
        {
            icon: '📧',
            title: 'อีเมล',
            content: ['info@premiersmartfarm.com', 'oem@premiersmartfarm.com']
        },
        {
            icon: '🕐',
            title: 'เวลาทำการ',
            content: ['จันทร์ - ศุกร์: 8:00 - 17:00', 'เสาร์: 9:00 - 12:00']
        }
    ];

    return (
        <div className="contact-page page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <span className="badge">Contact Us</span>
                    <h1>ติดต่อ<span className="text-gold">เรา</span></h1>
                    <p>
                        พร้อมให้บริการและตอบคำถามทุกข้อสงสัย ติดต่อเราได้หลายช่องทาง
                    </p>
                </div>
            </div>

            {/* Contact Section */}
            <section className="contact-section section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <div className="form-header">
                                <h3>ส่งข้อความถึงเรา</h3>
                                <p>กรอกข้อมูลด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด</p>
                            </div>

                            <form className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">ชื่อ-นามสกุล</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="กรอกชื่อ-นามสกุล"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">เบอร์โทรศัพท์</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            placeholder="กรอกเบอร์โทรศัพท์"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">อีเมล</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="กรอกอีเมล"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">หัวข้อ</label>
                                    <select id="subject" required>
                                        <option value="">เลือกหัวข้อ</option>
                                        <option value="product">สอบถามเกี่ยวกับผลิตภัณฑ์</option>
                                        <option value="oem">บริการ OEM</option>
                                        <option value="partnership">ความร่วมมือทางธุรกิจ</option>
                                        <option value="other">อื่นๆ</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">ข้อความ</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        placeholder="กรอกข้อความที่ต้องการสอบถาม"
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary submit-btn">
                                    ส่งข้อความ
                                    <span className="btn-arrow">→</span>
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="contact-info-wrapper">
                            <div className="contact-info-cards">
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
                            </div>

                            {/* Social Links */}
                            <div className="contact-social">
                                <h4>ติดตามเรา</h4>
                                <div className="social-links">
                                    <a href="https://www.facebook.com/thccenters" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a href="https://line.me/ti/p/~thcherbcenters" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Line">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                        </svg>
                                    </a>
                                    <a href="mailto:Thaiherbcenters@gmail.com" className="social-link" aria-label="Email">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.tiktok.com/@thcherbcenters" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="contact-map card">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1936.9!2d100.4977!3d13.8625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVkZKQytSNCBTYWkgTWEsIE5vbnRoYWJ1cmk!5e0!3m2!1sth!2sth!4v1702100000000"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Thai Herb Centers Location"
                                ></iframe>
                                <a
                                    href="https://www.google.com/maps/place/VFJC%2BR4+Sai+Ma,+Mueang+Nonthaburi+District,+Nonthaburi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline map-btn"
                                >
                                    🗺️ ดูแผนที่ขนาดใหญ่
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
