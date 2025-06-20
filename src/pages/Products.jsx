import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCog, FaIndustry, FaTools, FaHammer, FaSearch } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { collection, getDocs, doc, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Products() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

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

  const categories = [
    {
      id: 'Dişli Yedek Parçalar',
      icon: <FaCog className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Dişli Yedek Parçalar' : 'Gear Spare Parts',
      description: language === 'tr'
        ? 'Yüksek kaliteli dişli yedek parçaları ve aksesuarlar'
        : 'High quality gear spare parts and accessories'
    },
    {
      id: 'Universal Makinalar',
      icon: <FaIndustry className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Universal Makinalar' : 'Universal Machines',
      description: language === 'tr'
        ? 'İkinci el universal makina ve ekipmanlar'
        : 'Second-hand universal machines and equipment'
    },
    {
      id: 'Dişli Makinaları',
      icon: <FaTools className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Dişli Makinaları' : 'Gear Machines',
      description: language === 'tr'
        ? 'Modern dişli üretim ve işleme makineleri'
        : 'Modern gear manufacturing and processing machines'
    },
    {
      id: 'Azdırma Makinaları',
      icon: <FaHammer className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Azdırma Makinaları' : 'Hobbing Machines',
      description: language === 'tr'
        ? 'Yüksek hassasiyetli azdırma makineleri'
        : 'High precision hobbing machines'
    },
    {
      id: 'Fellow',
      icon: <FaCog className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Fellow' : 'Fellow',
      description: language === 'tr'
        ? 'Yüksek performanslı fellow ürünleri'
        : 'High performance fellow products'
    },
    {
      id: 'Raspa Çakıları',
      icon: <FaCog className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Raspa Çakıları' : 'Scraping Blades',
      description: language === 'tr'
        ? 'Yüksek performanslı raspa çakıları'
        : 'High performance scraping blades'
    }
  ];

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
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-600 text-white border border-primary-600'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-primary-600 hover:border-primary-200'
                      }`}
                    >
                      {category.title}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Product Image */}
                    <div className="relative h-44 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
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
                    <div className="p-4">
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
                      <div className="text-center">
                        <Link
                          to={`/products/${product.id}`}
                          className="inline-block bg-primary-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                          {language === 'tr' ? 'Detayları Gör' : 'View Details'}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 