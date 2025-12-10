import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Training from './pages/Training';
import OemOverview from './pages/oem/OemOverview';
import OemHighlights from './pages/oem/OemHighlights';
import OemServices from './pages/oem/OemServices';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/oem" element={<OemOverview />} />
            <Route path="/oem/highlights" element={<OemHighlights />} />
            <Route path="/oem/services" element={<OemServices />} />
            <Route path="/training" element={<Training />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
