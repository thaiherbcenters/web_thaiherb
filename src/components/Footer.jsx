import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src="/logo-icon.png" alt="Thai Herb Centers" />
                            <span>THAI HERB CENTERS</span>
                        </div>
                        <p>ผู้เชี่ยวชาญด้านผลิตภัณฑ์สมุนไพรไทย พร้อมบริการ OEM ครบวงจร</p>
                    </div>

                    <div className="footer-links">
                        <h4>เมนู</h4>
                        <ul>
                            <li><Link to="/">หน้าแรก</Link></li>
                            <li><Link to="/products">ผลิตภัณฑ์</Link></li>
                            <li><Link to="/oem">OEM</Link></li>
                            <li><Link to="/training">อบรมและกิจกรรม</Link></li>
                            <li><Link to="/contact">ติดต่อเรา</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>ติดต่อ</h4>
                        <ul>
                            <li>
                                <span className="icon">📍</span>
                                6/8 หมู่ที่ 2 ต.ไทรม้า อ.เมืองนนทบุรี จ.นนทบุรี 11000
                            </li>
                            <li>
                                <span className="icon">📞</span>
                                08-3979-9389, 06-3689-9798
                            </li>
                            <li>
                                <span className="icon">📧</span>
                                Thaiherbcenters@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 Thai Herb Centers. สงวนลิขสิทธิ์.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
