import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useLanguage } from '../context/LanguageContext';
import { FaDownload, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ProductDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fetchedProduct = { id: docSnap.id, ...docSnap.data() };
        setProduct(fetchedProduct);
        console.log("Fetched Product:", fetchedProduct);
      } else {
        setError(language === 'tr' ? 'Ürün bulunamadı' : 'Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(language === 'tr' ? 'Ürün yüklenirken bir hata oluştu' : 'Error loading product');
    } finally {
      setLoading(false);
    }
  };

  const renderSpecifications = () => {
    if (!product || !product.specifications) return null;

    const specs = product.specifications;
    if (typeof specs !== 'object' || Object.keys(specs).length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {language === 'tr' ? 'Özellikler' : 'Specifications'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-700">{key}:</span>{' '}
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDocuments = () => (
    <div className="space-y-4">
      {product.documents?.map((doc, index) => (
        <a
          key={index}
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <FaDownload />
          <span>{doc.name}</span>
        </a>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'tr' ? 'Ürün yükleniyor...' : 'Loading product...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600">
            {language === 'tr' ? 'Ürün bulunamadı' : 'Product not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images Gallery */}
            <div className="md:w-1/2 flex flex-col items-center">
              {Array.isArray(product.images) && product.images.length > 0 ? (
                <div className="relative w-full h-96 flex flex-col items-center">
                  <img
                    src={product.images[currentImage]}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded"
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImage((currentImage - 1 + product.images.length) % product.images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 border border-gray-200 focus:outline-none focus:ring-0"
                        style={{zIndex:2, width:'44px', height:'44px'}}
                        aria-label="Önceki görsel"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>
                      <button
                        onClick={() => setCurrentImage((currentImage + 1) % product.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 border border-gray-200 focus:outline-none focus:ring-0"
                        style={{zIndex:2, width:'44px', height:'44px'}}
                        aria-label="Sonraki görsel"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><polyline points="9 6 15 12 9 18"></polyline></svg>
                      </button>
                      {/* Dot Indicators */}
                      <div className="flex gap-1 mt-4 absolute bottom-2 left-1/2 -translate-x-1/2">
                        {product.images.map((_, idx) => (
                          <span
                            key={idx}
                            className={`inline-block w-8 h-1 rounded-full cursor-pointer transition-all duration-200 ${currentImage === idx ? 'bg-primary-600' : 'bg-gray-300'}`}
                            onClick={() => setCurrentImage(idx)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : product.image ? (
                <div className="relative h-96">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">
                    {language === 'tr' ? 'Görsel yok' : 'No image available'}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 md:w-1/2 flex flex-col justify-between">
              <div>
                {/* Product Details - Title, Brand, Model, Condition */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div className="col-span-2">
                      <h1 className="text-3xl font-bold text-gray-700">{product.name}</h1>
                    </div>

                    {product.brand && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {language === 'tr' ? 'Marka:' : 'Brand:'}
                        </span>{' '}
                        <span className="text-gray-600">{product.brand}</span>
                      </div>
                    )}
                    {product.model && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {language === 'tr' ? 'Model:' : 'Model:'}
                        </span>{' '}
                        <span className="text-gray-600">{product.model}</span>
                      </div>
                    )}
                    {product.condition && (
                      <div>
                        <span className="font-medium text-gray-700">
                          {language === 'tr' ? 'Durum:' : 'Condition:'}
                        </span>{' '}
                        <span className="text-gray-600">{product.condition}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === 'tr' ? 'Açıklama' : 'Description'}
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                {/* Specifications */}
                {renderSpecifications()}
                {product.documents && product.documents.length > 0 && renderDocuments()}
              </div>

              {/* Contact Button */}
              <div className="mt-6 flex justify-end">
                <a
                  href="/contact"
                  className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {language === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductDetail; 