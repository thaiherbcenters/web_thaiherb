import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Training.css';

const Training = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const upcomingEvents = [
        {
            id: 1,
            title: 'อบรมการทำยาดมสมุนไพรสูตรโบราณ',
            date: '15 มกราคม 2567',
            time: '09:00 - 16:00',
            location: 'Thai Herb Centers นนทบุรี',
            price: '1,500 บาท',
            image: '🌿',
            status: 'เปิดรับสมัคร'
        },
        {
            id: 2,
            title: 'Workshop การทำเทียนหอมไขถั่วเหลือง',
            date: '22 มกราคม 2567',
            time: '13:00 - 16:00',
            location: 'Thai Herb Centers นนทบุรี',
            price: '990 บาท',
            image: '🕯️',
            status: 'ว่าง 5 ที่นั่ง'
        }
    ];

    const pastEvents = [
        {
            id: 101,
            title: 'อบรมการแปรรูปสมุนไพรเบื้องต้น รุ่นที่ 5',
            date: '10 ธันวาคม 2566',
            participants: 30,
            image: '/images/training-gallery/ku/ku-1.jpg'
        },
        {
            id: 102,
            title: 'กิจกรรมปลูกสมุนไพรเพื่อชุมชน',
            date: '5 ธันวาคม 2566',
            participants: 50,
            image: '/images/training-gallery/ku/ku-2.jpg'
        },
        {
            id: 103,
            title: 'Workshop ทำสบู่สมุนไพร',
            date: '20 พฤศจิกายน 2566',
            participants: 20,
            image: '/images/training-gallery/phuket/main.jpg'
        }
    ];

    return (
        <div className="training-page page">
            <section className="page-hero">
                <div className="container page-hero-content">
                    <span className="badge animate-fadeInUp">อบรมและกิจกรรม</span>
                    <h1 className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        การอบรมและกิจกรรม <span className="text-gold">Activity</span>
                    </h1>
                    <p className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        เสริมสร้างความรู้และทักษะด้านสมุนไพร
                    </p>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="events-section section">
                <div className="container">
                    <div className="section-title">
                        <h2 className="animate-fadeInUp">กิจกรรมที่กำลังจะมาถึง</h2>
                    </div>
                    <div className="events-grid grid grid-2">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="event-card card">
                                <div className="event-status">{event.status}</div>
                                <div className="event-image">
                                    {event.image}
                                </div>
                                <div className="event-content">
                                    <h3>{event.title}</h3>
                                    <div className="event-details">
                                        <div className="event-detail">
                                            <span className="detail-icon">📅</span>
                                            <span>วันที่: {event.date}</span>
                                        </div>
                                        <div className="event-detail">
                                            <span className="detail-icon">⏰</span>
                                            <span>เวลา: {event.time}</span>
                                        </div>
                                        <div className="event-detail">
                                            <span className="detail-icon">📍</span>
                                            <span>สถานที่: {event.location}</span>
                                        </div>
                                        <div className="event-detail">
                                            <span className="detail-icon">💰</span>
                                            <span>ค่าลงทะเบียน: {event.price}</span>
                                        </div>
                                    </div>
                                    <Link to="/contact" className="btn btn-primary event-btn">
                                        สมัครเข้าร่วม
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Join */}
            <section className="why-join section">
                <div className="container">
                    <div className="why-join-grid">
                        <div className="why-join-content">
                            <span className="badge">การอบรมและกิจกรรม</span>
                            <h2>ทำไมต้องอบรมกับเรา?</h2>
                            <ul className="benefits-list">
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    วิทยากรผู้เชี่ยวชาญตัวจริง
                                </li>
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    เน้นการปฏิบัติจริง ทำเป็นอาชีพได้
                                </li>
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    อุปกรณ์และสถานที่มาตรฐาน
                                </li>
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    เครือข่ายผู้ประกอบการสมุนไพร
                                </li>
                            </ul>
                        </div>
                        <div className="why-join-image">
                            <div className="image-placeholder">
                                <span>🎓</span>
                                <p>Thai Herb Academy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Past Events Gallery */}
            <section className="past-events section">
                <div className="container">
                    <div className="section-title">
                        <h2 className="animate-fadeInUp">กิจกรรมที่ผ่านมา</h2>
                    </div>
                    <div className="events-grid grid grid-3">
                        {pastEvents.map(event => (
                            <div key={event.id} className="past-event-card">
                                <div className="past-event-image-container">
                                    {event.image.startsWith('/') ? (
                                        <img src={event.image} alt={event.title} className="past-event-img" />
                                    ) : (
                                        <span className="past-event-icon">📷</span>
                                    )}
                                </div>
                                <div className="past-event-content">
                                    <h4>{event.title}</h4>
                                    <p className="past-event-date">{event.date}</p>
                                    <p className="past-event-participants">ผู้เข้าร่วม: {event.participants} คน</p>
                                    <button
                                        className="btn btn-outline past-event-btn"
                                        onClick={() => setSelectedImage(event.image.startsWith('/') ? event.image : null)}
                                    >
                                        ดูภาพกิจกรรม
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="training-cta section">
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

            {/* Image Modal */}
            {selectedImage && (
                <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
                    <div className="gallery-content" onClick={e => e.stopPropagation()}>
                        <button className="gallery-close" onClick={() => setSelectedImage(null)}>&times;</button>
                        <img src={selectedImage} alt="Gallery" className="gallery-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Training;
