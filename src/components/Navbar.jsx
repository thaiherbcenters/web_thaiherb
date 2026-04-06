import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
// [DISABLED] import CartIcon from './CartIcon';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isOemDropdownOpen, setIsOemDropdownOpen] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsOemDropdownOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: t('navbar.home') },
        { path: '/oem', label: t('navbar.oem') },
        { path: '/products', label: t('navbar.products') },
        { path: '/news', label: t('navbar.news') },
        { path: '/contact', label: t('navbar.contact') },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <img src="/logo-icon.png" alt="Thai Herb Centers" className="logo-icon" />
                    <div className="logo-text">
                        <span className="logo-name">THAI HERB CENTERS</span>
                        <span className="logo-tagline">ไทย เฮิร์บ เซ็นเตอร์</span>
                    </div>
                </Link>

                {/* Right Side: Menu + Social + Actions */}
                <div className="navbar-right">
                    {/* Desktop Menu */}
                    <ul className="navbar-menu">
                        {navLinks.map((link) => (
                            <li
                                key={link.path}
                                className={`navbar-item ${link.hasDropdown ? 'has-dropdown' : ''}`}
                                onMouseEnter={() => link.hasDropdown && setIsOemDropdownOpen(true)}
                                onMouseLeave={() => link.hasDropdown && setIsOemDropdownOpen(false)}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `navbar-link ${isActive && !link.hasDropdown ? 'active' : ''} ${link.hasDropdown && location.pathname.startsWith('/oem') ? 'active' : ''
                                        }`
                                    }
                                >
                                    {link.label}
                                    {link.hasDropdown && (
                                        <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </NavLink>

                                {/* Dropdown */}
                                {link.hasDropdown && (
                                    <div className={`dropdown-menu ${isOemDropdownOpen ? 'open' : ''}`}>
                                        {link.dropdownItems.map((item) => (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                                                end={item.path === '/oem'}
                                            >
                                                {item.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    
                    {/* [DISABLED] Divider and Cart section - uncomment to re-enable
                    <div className="navbar-divider"></div>

                    <div className="navbar-actions">
                        <CartIcon />
                        <button
                            className={`navbar-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>

                    <div className="navbar-divider"></div>
                    */}

                    {/* Mobile Toggle (kept active) */}
                    <button
                        className={`navbar-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Language Selector */}
                    <LanguageSelector />
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-menu">
                    {navLinks.map((link) => (
                        <li key={link.path} className="mobile-item">
                            {link.hasDropdown ? (
                                <>
                                    <button
                                        className="mobile-link"
                                        onClick={() => setIsOemDropdownOpen(!isOemDropdownOpen)}
                                    >
                                        {link.label}
                                        <svg className={`dropdown-arrow ${isOemDropdownOpen ? 'open' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className={`mobile-dropdown ${isOemDropdownOpen ? 'open' : ''}`}>
                                        {link.dropdownItems.map((item) => (
                                            <NavLink key={item.path} to={item.path} className="mobile-dropdown-item" end={item.path === '/oem'}>
                                                {item.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <NavLink to={link.path} className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}>
                                    {link.label}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
