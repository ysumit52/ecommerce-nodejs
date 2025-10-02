import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';

// Add multiple items to the cart
export const addToCart = async (req: Request, res: Response) => {
  const { items } = req.body; // Expect an array of items
  const userId = req.user?.userId;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Add or update items in the cart
    for (const productId of items) {
      console.log(items);
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${productId}` });
      }

      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
      const quantityValue = 1;
      if (itemIndex >= 0) {
        // Update the quantity if the item already exists in the cart
        cart.items[itemIndex].quantity += quantityValue;
      } else {
        // Add the item to the cart if it doesn't exist
        cart.items.push({ productId, quantity: quantityValue });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to cart' });
  }
};

// Get the cart
export const getCart = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

// Update the quantity of an item in the cart
export const updateCartItem = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user?.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex >= 0) {
      // Update the quantity of the item
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart' });
  }
};

// Remove an item from the cart
export const removeCartItem = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = req.user?.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
};

// Clear the cart
export const clearCart = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    await Cart.findOneAndDelete({ userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart' });
  }
};
