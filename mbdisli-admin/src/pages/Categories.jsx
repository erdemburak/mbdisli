import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'adminCategories'));
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      setError('Kategoriler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setError('');
    setSuccess('');
    try {
      const docRef = await addDoc(collection(db, 'adminCategories'), { name: newCategory.trim() });
      console.log("Kategori eklendi:", docRef.id);
      setSuccess('Kategori eklendi');
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      console.error("Hata:", err);
      setError('Kategori eklenemedi');
    }
  };

  const handleDeleteCategory = async (id) => {
    setError('');
    setSuccess('');
    try {
      await deleteDoc(doc(db, 'adminCategories', id));
      setSuccess('Kategori silindi');
      fetchCategories();
    } catch (err) {
      setError('Kategori silinemedi');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Kategoriler</Typography>
        <Paper sx={{ p: 3 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Yeni Kategori"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddCategory}>
              Ekle
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {loading ? (
            <Typography>Yükleniyor...</Typography>
          ) : (
            <List>
              {categories.map(cat => (
                <ListItem
                  key={cat.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(cat.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={cat.name} />
                </ListItem>
              ))}
              {categories.length === 0 && <Typography>Kategori yok.</Typography>}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
} 