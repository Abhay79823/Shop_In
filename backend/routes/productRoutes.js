import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct
} from '../controllers/productController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, createProduct); // Protected route to add a product

export default router;

