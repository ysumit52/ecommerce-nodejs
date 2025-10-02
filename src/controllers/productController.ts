import { Request, Response } from 'express';
import Product from '../models/Product';

// Extend the Request type locally
declare module 'express' {
  interface Request {
    user?: { userId: string; role: string };
  }
}

// Create a product (Retailer and Admin)
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;
  const retailerId = req.user?.userId; // Now TypeScript recognizes `req.user`

  try {
    const product = new Product({ name, description, price, stock, retailerId });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Update a product (Retailer and Admin)
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true },
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Disable a product (Retailer and Admin)
export const disableProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error disabling product' });
  }
};

// Delete a product (Retailer and Admin)
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

// Update product stock (Retailer and Admin)
export const updateStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating stock' });
  }
};

// Get products by retailer (Admin)
export const getProductsByRetailer = async (req: Request, res: Response) => {
  const { retailerId } = req.params;

  try {
    const products = await Product.find({ retailerId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get products by retailer (Admin)
export const getProductsByUserId = async (req: Request, res: Response) => {
  try {
    const retailerId = req.user?.userId;
    const products = await Product.find({ retailerId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get products with pagination
export const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 20 } = req.query;

  try {
    const products = await Product.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const total = await Product.countDocuments();

    res.json({
      products,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
};
