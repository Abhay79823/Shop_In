import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import protect from './middleware/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', protect, cartRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
