import { Link } from 'react-router-dom';
import './Training.css';

const Training = () => {
    const upcomingEvents = [
        {
            id: 1,
            title: 'อบรมการผลิตสมุนไพรเบื้องต้น',
            date: '15 มกราคม 2567',
            time: '09:00 - 16:00 น.',
            location: 'ศูนย์ฝึกอบรม ไทยเฮิร์บ เซ็นเตอร์',
            price: 'ฟรี',
            image: '🌿',
            status: 'เปิดรับสมัคร'
        },
        {
            id: 2,
            title: 'Workshop สร้างแบรนด์สมุนไพร',
            date: '22 มกราคม 2567',
            time: '09:00 - 17:00 น.',
            location: 'ศูนย์ฝึกอบรม ไทยเฮิร์บ เซ็นเตอร์',
            price: '1,500 บาท',
            image: '🏭',
            status: 'เปิดรับสมัคร'
        },
        {
            id: 3,
            title: 'สัมมนาเทรนด์สมุนไพร 2567',
            date: '5 กุมภาพันธ์ 2567',
            time: '13:00 - 17:00 น.',
            location: 'Online (Zoom)',
            price: 'ฟรี',
            image: '📊',
            status: 'เร็วๆ นี้'
        }
    ];

    const pastEvents = [
        {
            title: 'อบรมมาตรฐาน GMP สำหรับโรงงานสมุนไพร',
            date: 'ธันวาคม 2566',
            participants: '45 คน',
            image: '✅'
        },
        {
            title: 'Workshop การตลาดออนไลน์สำหรับผลิตภัณฑ์สมุนไพร',
            date: 'พฤศจิกายน 2566',
            participants: '32 คน',
            image: '📱'
        },
        {
            title: 'ทัศนศึกษาโรงงานผลิตสมุนไพร',
            date: 'ตุลาคม 2566',
            participants: '28 คน',
            image: '🏭'
        }
    ];

    return (
        <div className="training-page page">
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <span className="badge">Training & Events</span>
                    <h1>อบรมและ<span className="text-gold">กิจกรรม</span></h1>
                    <p>
                        เรียนรู้และพัฒนาทักษะด้านสมุนไพรกับผู้เชี่ยวชาญ
                    </p>
                </div>
            </div>

            {/* Upcoming Events */}
            <section className="events-section section">
                <div className="container">
                    <div className="section-title">
                        <h2>กิจกรรม<span>ที่กำลังจะมาถึง</span></h2>
                        <p>ลงทะเบียนเข้าร่วมกิจกรรมและอบรมต่างๆ ของเรา</p>
                    </div>

                    <div className="events-grid grid grid-3">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="event-card card">
                                <div className="event-status">{event.status}</div>
                                <div className="event-image">{event.image}</div>
                                <div className="event-content">
                                    <h3>{event.title}</h3>
                                    <div className="event-details">
                                        <div className="event-detail">
                                            <span className="detail-icon">📅</span>
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="event-detail">
                                            <span className="detail-icon">⏰</span>
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="event-detail">
                                            <span className="detail-icon">📍</span>
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="event-detail">
                                            <span className="detail-icon">💰</span>
                                            <span>{event.price}</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary event-btn">
                                        ลงทะเบียน
                                    </button>
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
                            <span className="badge">ทำไมต้องเข้าร่วม</span>
                            <h2>ประโยชน์ที่คุณจะได้รับ</h2>
                            <div className="divider"></div>
                            <ul className="benefits-list">
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    เรียนรู้จากผู้เชี่ยวชาญโดยตรง
                                </li>
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    ปฏิบัติจริงในโรงงานมาตรฐาน GMP
                                </li>
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    ได้รับใบประกาศนียบัตร
                                </li>
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    เครือข่ายผู้ประกอบการสมุนไพร
                                </li>
                                <li>
                                    <span className="benefit-icon">✓</span>
                                    สิทธิพิเศษสำหรับบริการ OEM
                                </li>
                            </ul>
                        </div>
                        <div className="why-join-image">
                            <div className="image-placeholder">
                                <span>🎓</span>
                                <p>เรียนรู้และเติบโต</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Past Events */}
            <section className="past-events section">
                <div className="container">
                    <div className="section-title">
                        <h2>กิจกรรม<span>ที่ผ่านมา</span></h2>
                    </div>

                    <div className="past-events-grid grid grid-3">
                        {pastEvents.map((event, index) => (
                            <div key={index} className="past-event-card">
                                <div className="past-event-icon">{event.image}</div>
                                <h4>{event.title}</h4>
                                <p className="past-event-date">{event.date}</p>
                                <p className="past-event-participants">ผู้เข้าร่วม: {event.participants}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="training-cta section">
                <div className="container">
                    <div className="cta-box">
                        <h2>สนใจจัดอบรมเฉพาะองค์กร?</h2>
                        <p>ติดต่อเราเพื่อออกแบบหลักสูตรที่เหมาะกับองค์กรของคุณ</p>
                        <Link to="/contact" className="btn btn-primary">
                            ติดต่อเรา
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Training;
