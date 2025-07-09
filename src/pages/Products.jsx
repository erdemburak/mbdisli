import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCog, FaIndustry, FaTools, FaHammer, FaSearch } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { collection, getDocs, doc, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Kart için ayrı bir bileşen
function ProductCard({ product, language }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : product.image ? [product.image] : [];
  return (
    <motion.div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 relative group flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Product Image Gallery */}
      <div className="relative h-44 overflow-hidden flex flex-col items-center justify-center">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImage]}
              alt={product.name}
              className="w-full h-44 object-cover rounded"
            />
            {/* Slider Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={e => {e.stopPropagation(); setCurrentImage((currentImage - 1 + images.length) % images.length);}}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 border border-gray-200 focus:outline-none focus:ring-0 hidden group-hover:block"
                  style={{zIndex:2, width:'36px', height:'36px'}}
                  aria-label="Önceki görsel"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button
                  onClick={e => {e.stopPropagation(); setCurrentImage((currentImage + 1) % images.length);}}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 border border-gray-200 focus:outline-none focus:ring-0 hidden group-hover:block"
                  style={{zIndex:2, width:'36px', height:'36px'}}
                  aria-label="Sonraki görsel"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><polyline points="9 6 15 12 9 18"></polyline></svg>
                </button>
                {/* Dot Indicators */}
                <div className="flex gap-1 mt-2 absolute bottom-2 left-1/2 -translate-x-1/2">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`inline-block w-6 h-1 rounded-full cursor-pointer transition-all duration-200 ${currentImage === idx ? 'bg-primary-600' : 'bg-gray-300'}`}
                      onClick={e => {e.stopPropagation(); setCurrentImage(idx);}}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">
              {language === 'tr' ? 'Görsel yok' : 'No image available'}
            </span>
          </div>
        )}
        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2.5 py-1 rounded-full text-sm">
            {product.category}
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="flex-1 flex flex-col p-4">
        {/* Product Details */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-gray-900">
            <span className="font-medium mr-2 text-sm">
              {language === 'tr' ? 'Ürün:' : 'Product:'}
            </span>
            <span className="line-clamp-1 text-sm">{product.name}</span>
          </div>
          {product.brand && (
            <div className="flex items-center text-gray-600 text-sm">
              <span className="font-medium mr-2">
                {language === 'tr' ? 'Marka:' : 'Brand:'}
              </span>
              {product.brand}
            </div>
          )}
          {product.model && (
            <div className="flex items-center text-gray-600 text-sm">
              <span className="font-medium mr-2">
                {language === 'tr' ? 'Model:' : 'Model:'}
              </span>
              {product.model}
            </div>
          )}
          {product.condition && (
            <div className="flex items-center text-gray-600 text-sm">
              <span className="font-medium mr-2">
                {language === 'tr' ? 'Durum:' : 'Condition:'}
              </span>
              {product.condition}
            </div>
          )}
        </div>
        {/* View Details Button */}
        <div className="text-center mt-auto">
          <Link
            to={`/products/${product.id}`}
            className="inline-block bg-primary-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            {language === 'tr' ? 'Detayları Gör' : 'View Details'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      handleCategoryClick(categoryFromUrl); // Burada sayaç da artırılıyor
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCatLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'adminCategories'));
        setCategories(querySnapshot.docs.map(doc => doc.data().name));
      } catch (err) {
        setCatError('Kategoriler yüklenemedi');
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLowerCase();
    const brandMatch = product.brand?.toLowerCase().includes(searchTermLower);
    const modelMatch = product.model?.toLowerCase().includes(searchTermLower);
    const nameMatch = product.name?.toLowerCase().includes(searchTermLower);
    const categoryMatch = product.category?.toLowerCase().includes(searchTermLower);
    const conditionMatch = product.condition?.toLowerCase().includes(searchTermLower);

    return (
      (brandMatch || modelMatch || nameMatch || categoryMatch || conditionMatch) &&
      (!selectedCategory || product.category === selectedCategory)
    );
  });

  // Firestore'da kategori tıklama sayısını artıran fonksiyon
  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const categoryRef = doc(db, 'categoryClicks', categoryId);
      const categorySnap = await getDoc(categoryRef);
      if (categorySnap.exists()) {
        await updateDoc(categoryRef, { count: increment(1) });
      } else {
        await setDoc(categoryRef, { count: 1 });
      }
    } catch (error) {
      console.error('Kategori tıklama sayısı güncellenemedi:', error); // BU KISMI GÖZLEMLE
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'tr' ? 'Ürünlerimiz' : 'Our Products'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'tr'
              ? 'Sektörün ihtiyaçlarına yönelik geniş ürün yelpazemiz ile hizmetinizdeyiz'
              : 'We serve with our wide range of products tailored to industry needs'}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Search and Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 space-y-6">
              {/* Search Box */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'tr' ? 'Arama' : 'Search'}
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={language === 'tr' ? 'Ürün ara...' : 'Search products...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                  <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'tr' ? 'Kategoriler' : 'Categories'}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !selectedCategory
                        ? 'bg-primary-600 text-white border border-primary-600'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-200'
                    }`}
                  >
                    {language === 'tr' ? 'Tümü' : 'All'}
                  </button>
                  {catLoading && <button disabled className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-400">Kategoriler yükleniyor...</button>}
                  {catError && <button disabled className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-red-400">{catError}</button>}
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white border border-primary-600'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  {language === 'tr' ? 'Ürünler yükleniyor...' : 'Loading products...'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} language={language} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 