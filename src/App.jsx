import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Hobbing from './pages/products/Hobbing';
import Cutters from './pages/products/Cutters';
import Hobs from './pages/products/Hobs';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <LanguageProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen flex flex-col w-full max-w-[1920px] bg-gradient-to-b from-white to-gray-50">
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/hobbing" element={<Hobbing />} />
              <Route path="/products/cutters" element={<Cutters />} />
              <Route path="/products/hobs" element={<Hobs />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
