import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaBuilding, FaUsers, FaAward, FaHandshake, FaIndustry, FaTools, FaCogs, FaCog } from 'react-icons/fa';

function About() {
  const { language } = useLanguage();

  const features = [
    {
      icon: <FaBuilding className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Kalite' : 'Quality',
      description: language === 'tr' 
        ? 'En yüksek kalite standartlarında üretim ve hizmet'
        : 'Production and service at the highest quality standards'
    },
    {
      icon: <FaUsers className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Uzmanlık' : 'Expertise',
      description: language === 'tr'
        ? 'Sektörde uzun yıllara dayanan deneyim ve uzmanlık'
        : 'Long years of experience and expertise in the sector'
    },
    {
      icon: <FaAward className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Müşteri Odaklılık' : 'Customer Focus',
      description: language === 'tr'
        ? 'Müşteri memnuniyeti odaklı çalışma prensibi'
        : 'Customer satisfaction focused working principle'
    },
    {
      icon: <FaHandshake className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Güvenilirlik' : 'Reliability',
      description: language === 'tr'
        ? 'Güvenilir ve sürdürülebilir iş ortaklıkları'
        : 'Reliable and sustainable business partnerships'
    }
  ];

  const services = [
    {
      icon: <FaIndustry className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Dişli Yedek Parça İmalatı' : 'Gear Spare Parts Manufacturing',
      description: language === 'tr'
        ? 'Yüksek kaliteli dişli yedek parçaları ve aksesuarlar üretimi'
        : 'Manufacturing of high quality gear spare parts and accessories'
    },
    {
      icon: <FaTools className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Universal Makina Alım Satımı' : 'Universal Machine Trading',
      description: language === 'tr'
        ? 'İkinci el universal makina ve ekipmanların alım satımı'
        : 'Trading of second-hand universal machines and equipment'
    },
    {
      icon: <FaCogs className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Dişli Makinaları' : 'Gear Machines',
      description: language === 'tr'
        ? 'Modern dişli üretim ve işleme makineleri'
        : 'Modern gear manufacturing and processing machines'
    },
    {
      icon: <FaCog className="w-12 h-12 text-primary-600" />,
      title: language === 'tr' ? 'Raspa Çakıları' : 'Scraping Blades',
      description: language === 'tr'
        ? 'Yüksek performanslı raspa çakıları alım satımı'
        : 'Trading of high performance scraping blades'
    }
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
          {language === 'tr' ? 'Hakkımızda' : 'About Us'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'tr'
            ? 'Dişli ve makine sektöründe 20 yılı aşkın tecrübemiz ile müşterilerimize en iyi hizmeti sunuyoruz'
            : 'We provide the best service to our customers with over 20 years of experience in the gear and machine industry'}
        </p>
      </motion.div>

      {/* Company History */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {language === 'tr' ? 'Şirket Tarihçemiz' : 'Our Company History'}
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            {language === 'tr'
              ? '2000 yılında kurulan şirketimiz, dişli ve makine sektöründe faaliyet göstermeye başladı. İlk yıllarımızda dişli yedek parça üretimi ile başlayan yolculuğumuz, zamanla universal makina alım satımı ve dişli makinaları üretimi ile genişledi.'
              : 'Our company, founded in 2000, started operating in the gear and machine industry. Our journey, which started with gear spare parts production in our early years, expanded over time with universal machine trading and gear machine production.'}
          </p>
          <p className="text-gray-600">
            {language === 'tr'
              ? 'Bugün, sektörün önde gelen firmalarından biri olarak, müşterilerimize en kaliteli ürünleri ve hizmetleri sunmaya devam ediyoruz. Modern üretim tesislerimiz ve uzman kadromuz ile sektördeki yenilikleri yakından takip ediyor, müşterilerimizin ihtiyaçlarına en uygun çözümleri üretiyoruz.'
              : 'Today, as one of the leading companies in the industry, we continue to provide our customers with the highest quality products and services. With our modern production facilities and expert staff, we closely follow the innovations in the industry and produce the most suitable solutions for our customers\' needs.'}
          </p>
        </div>
      </motion.div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {language === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
          </h2>
          <p className="text-gray-600">
            {language === 'tr'
              ? 'Dişli ve makine sektöründe global bir marka olmak, yenilikçi çözümlerle müşterilerimizin ihtiyaçlarını en iyi şekilde karşılamak ve sektörde öncü olmak.'
              : 'To become a global brand in the gear and machine industry, to best meet our customers\' needs with innovative solutions, and to be a leader in the industry.'}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {language === 'tr' ? 'Misyonumuz' : 'Our Mission'}
          </h2>
          <p className="text-gray-600">
            {language === 'tr'
              ? 'Müşterilerimize en kaliteli ürünleri ve hizmetleri sunmak, sektördeki yenilikleri takip ederek sürekli gelişim sağlamak ve çalışanlarımızın potansiyellerini en üst düzeyde kullanmalarına olanak tanımak.'
              : 'To provide our customers with the highest quality products and services, to ensure continuous development by following innovations in the industry, and to enable our employees to use their potential at the highest level.'}
          </p>
        </motion.div>
      </div>

      {/* Services */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          {language === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div 
        className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {language === 'tr' ? 'Neden Biz?' : 'Why Choose Us?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default About; 