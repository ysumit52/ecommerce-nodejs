import express from 'express';
import {
  createProduct,
  updateProduct,
  disableProduct,
  deleteProduct,
  updateStock,
  getProductsByRetailer,
  getProductsByUserId,
  getProducts,
} from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Retailer and Admin routes
router.post('/', authMiddleware('retailer'), createProduct);
router.put('/:id', authMiddleware('retailer'), updateProduct);
router.put('/:id/disable', authMiddleware('retailer'), disableProduct);
router.delete('/:id', authMiddleware('retailer'), deleteProduct);
router.put('/:id/stock', authMiddleware('retailer'), updateStock);
router.get('/', authMiddleware('retailer'), getProductsByUserId);
router.get('/items', getProducts);
// Admin routes
router.get('/retailer/:retailerId', authMiddleware('admin'), getProductsByRetailer);

export default router;
