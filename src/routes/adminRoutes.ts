import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  updateComment,
  deleteComment,
  addRetailer,
  updateRetailer,
  deleteRetailer,
  createOrder,
} from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// CRUD Operations on Users
router.post('/users', authMiddleware('admin'), createUser);
router.put('/users/:id', authMiddleware('admin'), updateUser);
router.delete('/users/:id', authMiddleware('admin'), deleteUser);

// Manage Comments
router.put('/comments/:id', authMiddleware('admin'), updateComment);
router.delete('/comments/:id', authMiddleware('admin'), deleteComment);

// Manage Retailers
router.post('/retailers', authMiddleware('admin'), addRetailer);
router.put('/retailers/:id', authMiddleware('admin'), updateRetailer);
router.delete('/retailers/:id', authMiddleware('admin'), deleteRetailer);

// Create Order
router.post('/orders', authMiddleware('admin'), createOrder);

export default router;
