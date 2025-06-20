import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const categories = [
  'Dişli Yedek Parçalar',
  'Universal Makinalar',
  'Dişli Makinaları',
  'Azdırma Makinaları',
  'Fellow',
  'Raspa Çakıları',
];

const conditions = [
  'Sıfır',
  'İkinci El',
];

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    model: '',
    condition: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        ...formData,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'products'), productData);
      navigate('/products');
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Ürün eklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Yeni Ürün Ekle
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
            >
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

            <TextField
              fullWidth
              label="Görsel URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              margin="normal"
              placeholder="https://example.com/image.jpg"
              helperText="Ürün görselinin URL adresini girin"
            />

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
                disabled={loading}
              >
                {loading ? 'Ekleniyor...' : 'Ürün Ekle'}
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