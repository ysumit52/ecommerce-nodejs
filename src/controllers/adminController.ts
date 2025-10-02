import { Request, Response } from 'express';
import User from '../models/User';
import Comment from '../models/Comment';
import Retailer from '../models/Retailers';
import Order from '../models/Order';

// CRUD Operations on Users
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' + error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email, role }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' + error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' + error });
  }
};

// Manage Comments
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment' + error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' + error });
  }
};

// Manage Retailers
export const addRetailer = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const retailer = new Retailer({ name, email });
    await retailer.save();
    res.status(201).json(retailer);
  } catch (error) {
    res.status(500).json({ error: 'Error adding retailer' + error });
  }
};

export const updateRetailer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const retailer = await Retailer.findByIdAndUpdate(id, { name, email }, { new: true });
    res.json(retailer);
  } catch (error) {
    res.status(500).json({ error: 'Error updating retailer' + error });
  }
};

export const deleteRetailer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Retailer.findByIdAndDelete(id);
    res.json({ message: 'Retailer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting retailer' + error });
  }
};

// Create Order for a Customer
export const createOrder = async (req: Request, res: Response) => {
  const { customerId, productId, quantity } = req.body;
  try {
    const order = new Order({ customerId, productId, quantity });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' + error });
  }
};
