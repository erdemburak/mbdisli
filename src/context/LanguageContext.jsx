import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      products: 'Ürünler',
      contact: 'İletişim'
    },
    home: {
      title: 'MB Dişli',
      subtitle: 'Dişli Sistemleri Çözüm Ortağınız',
      description: 'Kaliteli ve güvenilir dişli sistemleri çözümleri sunuyoruz.',
      cta: 'Ürünlerimizi Keşfedin',
      hero: {
        title: 'MB Dişli Sistemleri',
        subtitle: 'Kaliteli ve Güvenilir Dişli Çözümleri',
        cta: 'Ürünlerimizi Keşfedin'
      },
      features: {
        title: 'Neden Bizi Tercih Etmelisiniz?',
        subtitle: 'Kaliteli ürünler ve profesyonel hizmet',
        quality: {
          title: 'Kalite',
          description: 'En yüksek kalite standartlarında üretim'
        },
        experience: {
          title: 'Deneyim',
          description: 'Sektörde uzun yıllara dayanan tecrübe'
        },
        service: {
          title: 'Hizmet',
          description: 'Müşteri odaklı yaklaşım ve destek'
        }
      },
      cta: {
        title: 'Bizimle Çalışın',
        subtitle: 'Kaliteli ürünler ve profesyonel hizmet için hemen iletişime geçin',
        button: 'İletişime Geçin'
      }
    },
    about: {
      title: 'Hakkımızda',
      subtitle: 'MB Dişli olarak, dişli sistemleri sektöründe kalite ve güvenin adresi olmaya devam ediyoruz.',
      vision: {
        title: 'Vizyonumuz',
        content: 'Dişli sistemleri sektöründe teknolojik yenilikleri takip ederek, müşterilerimize en kaliteli ürünleri sunmak ve sektörde öncü olmak.'
      },
      mission: {
        title: 'Misyonumuz',
        content: 'Müşterilerimizin ihtiyaçlarını en iyi şekilde anlayarak, onlara özel çözümler üretmek ve kaliteli hizmet sunmak.'
      }
    },
    contact: {
      title: 'İletişim',
      subtitle: 'Bizimle iletişime geçin',
      info: {
        title: 'İletişim Bilgileri',
        address: 'Adres',
        phone: 'Telefon',
        email: 'E-posta'
      },
      form: {
        title: 'İletişim Formu',
        name: 'Ad Soyad',
        email: 'E-posta',
        message: 'Mesaj',
        submit: 'Gönder'
      }
    },
    products: {
      title: 'Ürünlerimiz',
      subtitle: 'Kaliteli ve güvenilir dişli sistemleri çözümleri',
      categories: {
        hobbing: 'Dişli Açma Makineleri',
        cutters: 'Dişli Kesiciler',
        hobs: 'Dişli Frezeleri'
      },
      viewDetails: 'Detayları Görüntüle',
      details: 'Detayları Görüntüle'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      contact: 'Contact'
    },
    home: {
      title: 'MB Gear',
      subtitle: 'Your Gear Systems Partner',
      description: 'We provide quality and reliable gear system solutions.',
      cta: 'Explore Our Products',
      hero: {
        title: 'MB Gear Systems',
        subtitle: 'Quality and Reliable Gear Solutions',
        cta: 'Explore Our Products'
      },
      features: {
        title: 'Why Choose Us?',
        subtitle: 'Quality products and professional service',
        quality: {
          title: 'Quality',
          description: 'Production at the highest quality standards'
        },
        experience: {
          title: 'Experience',
          description: 'Long years of experience in the sector'
        },
        service: {
          title: 'Service',
          description: 'Customer-focused approach and support'
        }
      },
      cta: {
        title: 'Work With Us',
        subtitle: 'Contact us now for quality products and professional service',
        button: 'Contact Us'
      }
    },
    about: {
      title: 'About Us',
      subtitle: 'As MB Gear, we continue to be the address of quality and trust in the gear systems industry.',
      vision: {
        title: 'Our Vision',
        content: 'To be a leader in the gear systems industry by following technological innovations and offering the highest quality products to our customers.'
      },
      mission: {
        title: 'Our Mission',
        content: 'To understand our customers\' needs in the best way possible, to produce special solutions for them and to provide quality service.'
      }
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch with us',
      info: {
        title: 'Contact Information',
        address: 'Address',
        phone: 'Phone',
        email: 'Email'
      },
      form: {
        title: 'Contact Form',
        name: 'Full Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send'
      }
    },
    products: {
      title: 'Our Products',
      subtitle: 'Quality and reliable gear system solutions',
      categories: {
        hobbing: 'Gear Hobbing Machines',
        cutters: 'Gear Cutters',
        hobs: 'Gear Hobs'
      },
      viewDetails: 'View Details',
      details: 'View Details'
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('tr');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 