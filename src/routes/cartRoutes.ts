import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cartController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Consumer routes
router.post('/', authMiddleware('consumer'), addToCart);
router.get('/', authMiddleware('consumer'), getCart);
router.put('/:productId', authMiddleware('consumer'), updateCartItem);
router.delete('/:productId', authMiddleware('consumer'), removeCartItem);
router.delete('/', authMiddleware('consumer'), clearCart);

export default router;
