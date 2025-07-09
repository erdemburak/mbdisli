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
            : 'With over 20 years of experience in the gear and machinery sector, we strive to provide the best service to our customers.'}
        </p>
      </motion.div>

      {/* Company About Us */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            {language === 'tr'
              ? 'MB Dişli, makina imalatı ve dişli üretimi alanında kaliteli, güvenilir ve yenilikçi çözümler sunan bir makina imalat firmasıdır. Öte yandan, 20 yılı aşkın tecrübemizle müşterilerimize en iyi şartlarda, en yüksek kaliteyle hizmet sunmaya özen gösteriyoruz.'
              : 'MB Disli is a machinery manufacturing company that provides high-quality, reliable, and innovative solutions in the field of machinery and gear production. With over 20 years of experience, we strive to offer our customers the best conditions and the highest quality service.'}
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
              ? 'MB DİŞLİ olarak, ürün ve hizmet sunduğumuz sektördeki teknolojik gelişmelerde adından söz ettiren; müşterilerinin ve içinde bulunduğu toplumun hayatına değer katan; kurduğu çözüm ortaklıklarında performansıyla örnek gösterilen; sürdürülebilir gelişimi çalışma kültürü olarak benimseyen organizasyon yapısıyla tercih edilen bir şirket olmayı amaçlıyoruz.'
              : 'As MB DISLI, our vision is to be a preferred company with an organizational structure that is recognized for its technological advancements in the sector, adds value to the lives of its customers and society, is exemplary in its partnerships with its performance, and adopts sustainable development as a working culture.'}
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
              ? 'En kaliteli ürünü, en uygun fiyatla satmak, Kalite ve doğruluktan ödün vermeden büyümek, Müşteri memnuniyetini sürekli kılmak, Personelimizin eğitim seviyesini sürekli arttırmak'
              : 'To sell the highest quality product at the most affordable price, to grow without compromising quality and integrity, to ensure continuous customer satisfaction, and to continuously improve the education level of our staff.'}
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