import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Alert,
  MenuItem,
} from '@mui/material';
import { doc, getDoc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const conditions = [
  'Sıfır',
  'İkinci El',
];

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    model: '',
    condition: '',
    description: '',
    images: [''],
  });
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState('');

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const product = docSnap.data();
        setFormData({
          name: product.name || '',
          category: product.category || '',
          brand: product.brand || '',
          model: product.model || '',
          condition: product.condition || '',
          description: product.description || '',
          images: Array.isArray(product.images)
            ? product.images.length > 0 ? product.images : ['']
            : product.image
            ? [product.image]
            : [''],
        });
      } else {
        setError('Ürün bulunamadı');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Ürün yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (idx, value) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === idx ? value : img)),
    }));
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const handleRemoveImage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const productData = {
        ...formData,
        images: formData.images.map((url) => url.trim()).filter((url) => url),
        updatedAt: new Date(),
      };
      delete productData.image;
      await updateDoc(doc(db, 'products', id), productData);
      navigate('/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Ürün güncellenirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Yükleniyor...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ürün Düzenle
        </Typography>

        <Paper sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Ürün Adı"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              select
              label="Kategori"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              margin="normal"
              disabled={catLoading || !!catError}
            >
              {catLoading && <MenuItem disabled>Kategoriler yükleniyor...</MenuItem>}
              {catError && <MenuItem disabled>{catError}</MenuItem>}
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Marka"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              select
              label="Durum"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              margin="normal"
            >
              {conditions.map((condition) => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Görsel URL'leri
              </Typography>
              {formData.images.map((img, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TextField
                    fullWidth
                    label={`Görsel URL ${idx + 1}`}
                    value={img}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    margin="normal"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.images.length > 1 && (
                    <Button onClick={() => handleRemoveImage(idx)} color="error" sx={{ ml: 1 }}>
                      Sil
                    </Button>
                  )}
                </Box>
              ))}
              <Button onClick={handleAddImage} variant="outlined" sx={{ mt: 1 }}>
                + Görsel Ekle
              </Button>
            </Box>

            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                type="submit"
                disabled={saving}
              >
                {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/products')}
              >
                İptal
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 