import { Cart } from '../models/cart.model.js';
import { Products } from '../models/products.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Add or update item in cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity, size } = req.body;
    if (!productId || !size) {
      throw new ApiError(400, 'Product and size are required');
    }
    const product = await Products.findById(productId);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    // Check if item with same product and size exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1, size });
    }
    await cart.save();
    return res.status(200).json(new ApiResponse(200, cart, 'Cart updated'));
  } catch (error) {
    return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || 'Error adding to cart'));
  }
};

// Get current user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    return res.status(200).json(new ApiResponse(200, cart || { items: [] }, 'Cart fetched'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Error fetching cart'));
  }
};

// Update quantity or size of an item
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(404, 'Cart not found');
    const item = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );
    if (!item) throw new ApiError(404, 'Item not found in cart');
    if (quantity !== undefined) item.quantity = quantity;
    await cart.save();
    return res.status(200).json(new ApiResponse(200, cart, 'Cart item updated'));
  } catch (error) {
    return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || 'Error updating cart item'));
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(404, 'Cart not found');
    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size)
    );
    await cart.save();
    return res.status(200).json(new ApiResponse(200, cart, 'Item removed from cart'));
  } catch (error) {
    return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || 'Error removing cart item'));
  }
}; 