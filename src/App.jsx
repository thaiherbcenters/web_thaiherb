import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import News from './pages/News';
import PRPlan from './pages/PRPlan';
import Documents from './pages/Documents';
import OemOverview from './pages/oem/OemOverview';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
            <Navbar />
            <SocialSidebar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/oem" element={<OemOverview />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                {/* <Route path="/pr-plan" element={<PRPlan />} /> */}
                <Route path="/documents" element={<Documents />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;

