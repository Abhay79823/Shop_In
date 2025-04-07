import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { addToCart, getUserCart, updateCartItem, removeCartItem } from '../controllers/cartController.js';



const router = express.Router();

router.use(protect); // Protect all cart routes

router.get('/', getUserCart);
router.post('/',protect, addToCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeCartItem );

export default router;

