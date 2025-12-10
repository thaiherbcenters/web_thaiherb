import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src="/logo-icon.png" alt="Thai Herb Centers" className="footer-logo-icon" />
                            <div className="footer-logo-text">
                                <span className="footer-logo-name">THAI HERB CENTERS</span>
                                <span className="footer-logo-tagline">วิสาหกิจชุมชน ไทยเฮิร์บ เซ็นเตอร์</span>
                            </div>
                        </Link>
                        <p className="footer-description">
                            ผู้เชี่ยวชาญด้านผลิตภัณฑ์สมุนไพรไทย พร้อมบริการ OEM ครบวงจร
                        </p>
                    </div>

                    {/* Links */}
                    <div className="footer-links-group">
                        <h4>เมนู</h4>
                        <ul>
                            <li><Link to="/">หน้าแรก</Link></li>
                            <li><Link to="/products">ผลิตภัณฑ์</Link></li>
                            <li><Link to="/oem">บริการ OEM</Link></li>
                            <li><Link to="/training">อบรมและกิจกรรม</Link></li>
                            <li><Link to="/contact">ติดต่อเรา</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-links-group">
                        <h4>ติดต่อ</h4>
                        <ul className="footer-contact">
                            <li>📞 02-123-4567</li>
                            <li>📧 info@thaiherb.com</li>
                            <li>📍 กรุงเทพมหานคร</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <p>© {currentYear} Thai Herb Centers. สงวนลิขสิทธิ์.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
