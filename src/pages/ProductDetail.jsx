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
            {/* Product Images */}
            <div className="md:w-1/2">
              {product.image ? (
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