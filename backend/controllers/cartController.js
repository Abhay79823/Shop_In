import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Format cart items for frontend
const formatCartItems = (cart) => {
  return cart?.items.map(item => ({
    _id: item._id,
    quantity: item.quantity,
    product: item.productId,
  })) || [];
};

// GET /api/cart
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(formatCartItems(cart));
  } catch (err) {
    res.status(500).json({ message: 'Error getting cart' });
  }
};

// POST /api/cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const updated = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.status(201).json(formatCartItems(updated));
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

// PUT /api/cart/:productId
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    item.quantity = quantity;
    await cart.save();

    const updated = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(formatCartItems(updated));
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart' });
  }
};

// DELETE /api/cart/:productId
export const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    const updated = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(formatCartItems(updated));
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

// DELETE /api/cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
