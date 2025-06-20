import { motion } from 'framer-motion';
import { useLanguage, translations } from '../../context/LanguageContext';
import { FaCog, FaTools, FaIndustry, FaCheck } from 'react-icons/fa';

function Hobbing() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      icon: <FaCog className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'CNC Kontrol' : 'CNC Control',
      description: language === 'tr'
        ? 'Tam otomatik CNC kontrol sistemi ile hassas üretim'
        : 'Precise production with fully automatic CNC control system'
    },
    {
      icon: <FaTools className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Yüksek Hassasiyet' : 'High Precision',
      description: language === 'tr'
        ? 'Mikron seviyesinde hassasiyet ile üretim'
        : 'Production with micron level precision'
    },
    {
      icon: <FaIndustry className="w-8 h-8 text-primary-600" />,
      title: language === 'tr' ? 'Otomatik Takım Değiştirme' : 'Automatic Tool Change',
      description: language === 'tr'
        ? 'Hızlı ve hassas otomatik takım değiştirme sistemi'
        : 'Fast and precise automatic tool changing system'
    }
  ];

  const specifications = [
    language === 'tr' ? 'Maksimum dişli çapı: 500mm' : 'Maximum gear diameter: 500mm',
    language === 'tr' ? 'Maksimum modül: 12' : 'Maximum module: 12',
    language === 'tr' ? 'Maksimum diş genişliği: 400mm' : 'Maximum gear width: 400mm',
    language === 'tr' ? 'Maksimum diş sayısı: 999' : 'Maximum number of teeth: 999',
    language === 'tr' ? 'Maksimum iş parçası ağırlığı: 1000kg' : 'Maximum workpiece weight: 1000kg'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.products.categories.hobbing}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'tr'
            ? 'Yüksek hassasiyetli dişli açma makineleri ile endüstriyel üretimde mükemmellik'
            : 'Excellence in industrial production with high precision gear hobbing machines'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {language === 'tr' ? 'Teknik Özellikler' : 'Technical Specifications'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specifications.map((spec, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <FaCheck className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700">{spec}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {language === 'tr' ? 'Detaylı Bilgi İçin' : 'For More Information'}
        </h2>
        <p className="text-gray-600 mb-6">
          {language === 'tr'
            ? 'Ürünlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.'
            : 'Contact us for detailed information about our products.'}
        </p>
        <a
          href="/contact"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          {language === 'tr' ? 'İletişime Geç' : 'Contact Us'}
        </a>
      </motion.div>
    </div>
  );
}

export default Hobbing; 