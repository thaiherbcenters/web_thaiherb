import './Contact.css';

const Contact = () => {
    const contactInfo = [
        {
            icon: '📍',
            title: 'ที่อยู่',
            content: ['6/8 หมู่ที่ 2 ต.ไทรม้า อ.เมืองนนทบุรี จ.นนทบุรี 11000']
        },
        {
            icon: '📞',
            title: 'เบอร์โทรศัพท์',
            content: ['08-3979-9389', '06-3689-9798']
        },
        {
            icon: '📧',
            title: 'อีเมล',
            content: ['Thaiherbcenters@gmail.com']
        },
        {
            icon: '🕐',
            title: 'เวลาทำการ',
            content: ['จันทร์ - ศุกร์: 8:00 - 17:00', 'เสาร์: 9:00 - 12:00']
        }
    ];

    return (
        <div className="contact-page page">
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge animate-fadeInUp">ติดต่อเรา</span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        ติดต่อเรา <span className="text-gold">US</span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        สอบถามข้อมูลเพิ่มเติม หรือปรึกษาเรื่องการผลิต OEM
                    </p>

                </div>
            </section>

            <div className="container section">
                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <div className="form-header">
                            <h3>ส่งข้อความถึงเรา</h3>
                            <p>เราจะติดต่อกลับโดยเร็วที่สุด</p>
                        </div>
                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>ชื่อ-นามสกุล</label>
                                    <input type="text" placeholder="ชื่อ-นามสกุล" />
                                </div>
                                <div className="form-group">
                                    <label>เบอร์โทรศัพท์</label>
                                    <input type="tel" placeholder="เบอร์โทรศัพท์" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>อีเมล</label>
                                <input type="email" placeholder="อีเมล" />
                            </div>
                            <div className="form-group">
                                <label>หัวข้อติดต่อ</label>
                                <select>
                                    <option>สอบถามทั่วไป</option>
                                    <option>สนใจผลิตภัณฑ์</option>
                                    <option>สนใจบริการ OEM</option>
                                    <option>สมัครอบรม</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>ข้อความ</label>
                                <textarea placeholder="ข้อความ..."></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary submit-btn">
                                ส่งข้อความ
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
                            <h4>Social Media</h4>
                            <div className="social-links">
                                <a href="https://www.facebook.com/thccenters" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="https://www.tiktok.com/@thaiherb.centers" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                                </a>
                            </div>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>TikTok: ธวัช รับผลิตสินค้าสมุนไพร</p>
                        </div>

                        <div className="contact-map card">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.816654260388!2d100.4688893153549!3d13.84999999873465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b1111111111%3A0x1111111111111111!2sThai%20Herb%20Centers!5e0!3m2!1sen!2sth!4v1620000000000!5m2!1sen!2sth"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                            <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className="btn btn-outline map-btn">
                                ดูแผนที่ Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
