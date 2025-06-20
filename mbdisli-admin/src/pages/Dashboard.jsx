import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState(0);
  const [recentProducts, setRecentProducts] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [categoryClicks, setCategoryClicks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all products
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate totals
      setTotalProducts(products.length);

      // Get recent products
      const recentQuery = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const recentSnapshot = await getDocs(recentQuery);
      setRecentProducts(
        recentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      // Calculate category statistics (product count)
      const stats = {};
      products.forEach((product) => {
        if (!stats[product.category]) {
          stats[product.category] = {
            count: 0,
          };
        }
        stats[product.category].count++;
      });
      setCategoryStats(stats);

      // Fetch category click counts from categoryClicks collection
      const clicksSnapshot = await getDocs(collection(db, 'categoryClicks'));
      const clicksData = {};
      clicksSnapshot.forEach((doc) => {
        clicksData[doc.id] = doc.data().count || 0;
      });
      setCategoryClicks(clicksData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Recent Products */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Son Eklenen Ürünler
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/products/add')}
                >
                  Yeni Ürün
                </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ürün Adı</TableCell>
                      <TableCell>Kategori</TableCell>
                      <TableCell>Marka</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>Durum</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.brand || '-'}</TableCell>
                        <TableCell>{product.model || '-'}</TableCell>
                        <TableCell>{product.condition || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Total Products Card */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Toplam Ürün
              </Typography>
              <Typography variant="h3">{totalProducts}</Typography>
            </Paper>
          </Grid>

          {/* Category Statistics */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Kategori İstatistikleri
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(categoryStats).map(([category, stats]) => (
                  <Grid item xs={12} sm={6} md={4} key={category}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <InventoryIcon sx={{ mr: 1 }} />
                          <Typography variant="h6">{category}</Typography>
                        </Box>
                        <Typography color="text.secondary">
                          Ürün Sayısı: {stats.count}
                        </Typography>
                        <Typography color="text.secondary">
                          Toplam Tıklama: {categoryClicks[category] || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 