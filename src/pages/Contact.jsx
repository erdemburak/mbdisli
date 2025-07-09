import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaBuilding } from 'react-icons/fa';

function Contact() {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6 text-primary-600" />,
      title: language === 'tr' ? 'Adres' : 'Address',
      content: 'İvedik OSB Mah. 1448 Sok. No:39 Yenimahalle / Ankara'
    },
    {
      icon: <FaPhone className="w-6 h-6 text-primary-600" />,
      title: language === 'tr' ? 'Telefon' : 'Phone',
      content: '+90 532 768 78 66'
    },
    {
      icon: <FaWhatsapp className="w-6 h-6 text-primary-600" />,
      title: 'WhatsApp',
      content: '+90 532 768 78 66'
    },
    {
      icon: <FaEnvelope className="w-6 h-6 text-primary-600" />,
      title: language === 'tr' ? 'E-posta' : 'Email',
      content: 'mbdisli06@gmail.com'
    },
    {
      icon: <FaClock className="w-6 h-6 text-primary-600" />,
      title: language === 'tr' ? 'Çalışma Saatleri' : 'Working Hours',
      content: language === 'tr'
        ? 'Pazartesi - Cuma: 08:00 - 18:00\nCumartesi: 08:00 - 17:00\nPazar: Kapalı'
        : 'Monday - Friday: 08:00 - 18:00\nSaturday: 08:00 - 17:00\nSunday: Closed'
    }
  ];

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
            {language === 'tr' ? 'İletişim' : 'Contact'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'tr'
              ? 'Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız'
              : 'Get in touch with us, we are happy to help you'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                <FaBuilding className="w-7 h-7 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
                </h2>
              </div>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-3 rounded-lg"
                  >
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{info.title}</h3>
                      <p className="text-sm text-gray-600 mt-0.5" style={{ whiteSpace: 'pre-line' }}>{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191.057291973247!2d32.73355152770868!3d39.98796747508462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d349f1ddb85c47%3A0x62b72e58a1f2b931!2sOstim%2C%201448.%20Sk.%20no%3A39%2C%2006560%20Yenimahalle%2FAnkara!5e0!3m2!1str!2str!4v1749903964811!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MB Dişli Location"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 