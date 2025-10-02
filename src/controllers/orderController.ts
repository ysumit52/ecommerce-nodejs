import { Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';

// Create order
export const createOrder = async (req: Request, res: Response) => {
  const { deliveryAddress } = req.body;
  const userId = req.user?.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: (item.productId as any).price,
    }));

    const totalAmount = items.reduce((total, item) => total + item.quantity * item.price, 0);

    const order = new Order({
      userId,
      items,
      totalAmount,
      deliveryAddress,
    });

    await order.save();
    await Cart.findOneAndDelete({ userId }); // Clear the cart after creating the order
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Get orders for consumer
export const getOrders = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const orders = await Order.find({ userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;

  try {
    const order = await Order.findOne({ _id: id, userId }).populate('items.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
};
