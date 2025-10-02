import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Consumer routes
router.post('/', authMiddleware('consumer'), createOrder);
router.get('/', authMiddleware('consumer'), getOrders);
router.get('/:id', authMiddleware('consumer'), getOrderById);

// Admin routes
router.put('/:id/status', authMiddleware('admin'), updateOrderStatus);

export default router;
