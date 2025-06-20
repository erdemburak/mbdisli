import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { FaIndustry, FaTools, FaCogs, FaCog, FaWrench, FaHammer } from 'react-icons/fa';
import { useLanguage, translations } from '../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const featuredProducts = [
    {
      id: 1,
      title: language === 'tr' ? "Dişli Yedek Parçalar" : "Gear Spare Parts",
      description: language === 'tr' 
        ? "Yüksek kaliteli dişli yedek parçaları ve aksesuarlar"
        : "High quality gear spare parts and accessories",
      image: "/images/gear-parts.jpg",
      icon: <FaCog className="w-12 h-12 text-primary-600" />,
      category: "Dişli Yedek Parçalar"
    },
    {
      id: 2,
      title: language === 'tr' ? "Universal Makinalar" : "Universal Machines",
      description: language === 'tr'
        ? "İkinci el universal makina ve ekipmanlar"
        : "Second-hand universal machines and equipment",
      image: "/images/universal-machines.jpg",
      icon: <FaIndustry className="w-12 h-12 text-primary-600" />,
      category: "Universal Makinalar"
    },
    {
      id: 3,
      title: language === 'tr' ? "Dişli Makinaları" : "Gear Machines",
      description: language === 'tr'
        ? "Modern dişli üretim ve işleme makineleri"
        : "Modern gear manufacturing and processing machines",
      image: "/images/gear-machines.jpg",
      icon: <FaTools className="w-12 h-12 text-primary-600" />,
      category: "Dişli Makinaları"
    },
    {
      id: 4,
      title: language === 'tr' ? "Azdırma Makinaları" : "Hobbing Machines",
      description: language === 'tr'
        ? "Yüksek hassasiyetli azdırma makineleri"
        : "High precision hobbing machines",
      image: "/images/hobbing-machines.jpg",
      icon: <FaHammer className="w-12 h-12 text-primary-600" />,
      category: "Azdırma Makinaları"
    },
    {
      id: 5,
      title: language === 'tr' ? "Fellow" : "Fellow",
      description: language === 'tr'
        ? "Yüksek performanslı fellow ürünleri"
        : "High performance fellow products",
      image: "/images/fellow.jpg",
      icon: <FaCog className="w-12 h-12 text-primary-600" />,
      category: "Fellow"
    },
    {
      id: 6,
      title: language === 'tr' ? "Raspa Çakıları" : "Scraping Blades",
      description: language === 'tr'
        ? "Yüksek performanslı raspa çakıları"
        : "High performance scraping blades",
      image: "/images/scraping-blades.jpg",
      icon: <FaCog className="w-12 h-12 text-primary-600" />,
      category: "Raspa Çakıları"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Swiper */}
      <div className="w-full">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="h-[600px] w-full"
        >
          <SwiperSlide className="bg-gradient-to-r from-primary-600 to-primary-800 relative">
            <motion.img
              src="https://i.imgur.com/B2zwIIW.png"
              alt="Banner Image"
              className="absolute left-0 top-0 w-full h-full opacity-20 hidden md:block object-cover"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 0.20, x: 0 }}
            />
            <div className="h-full flex items-center justify-center text-white w-full relative z-10">
              <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8">
                <motion.h1 
                  className="text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {language === 'tr' 
                    ? "Dişli ve Makine Sektörünün Güvenilir Adresi"
                    : "Trusted Name in Gear and Machine Industry"}
                </motion.h1>
                <motion.p 
                  className="text-xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {language === 'tr'
                    ? "Dişli yedek parça imalatı, ikinci el universal makina ve dişli makinaları alım satımı, azdırma fellow dik planya torna freze ve dişli kesici takımı üretimi"
                    : "Gear spare parts manufacturing, second-hand universal and gear machines trading, hobbing fellow vertical planer lathe cutting tool production"}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/products"
                    className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {language === 'tr' ? "Ürünlerimizi İnceleyin" : "Explore Our Products"}
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Features Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'tr' ? "Ürün Kategorilerimiz" : "Our Product Categories"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'tr'
              ? "Sektörün ihtiyaçlarına yönelik geniş ürün yelpazemiz ile hizmetinizdeyiz"
              : "We serve with our wide range of products tailored to industry needs"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="p-8">
                <div className="mb-4">{product.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors"
                >
                  {language === 'tr' ? "Detayları Gör" : "View Details"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {language === 'tr' 
                ? "Kaliteli Ürünler, Uzman Hizmet"
                : "Quality Products, Expert Service"}
            </h2>
            <p className="text-xl mb-8">
              {language === 'tr'
                ? "20 yılı aşkın sektör tecrübemiz ile sizlere en iyi hizmeti sunuyoruz"
                : "We provide the best service with over 20 years of industry experience"}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              {language === 'tr' ? "Bizimle İletişime Geçin" : "Contact Us"}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home; 