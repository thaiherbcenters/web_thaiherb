import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartIcon.css';

const CartIcon = () => {
    const { getCartCount } = useCart();
    const itemCount = getCartCount();

    return (
        <Link to="/cart" className="cart-icon-link">
            <div className="cart-icon-container">
                <svg
                    className="cart-icon-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {itemCount > 0 && (
                    <span className="cart-badge">{itemCount > 99 ? '99+' : itemCount}</span>
                )}
            </div>
        </Link>
    );
};

export default CartIcon;
