import { Router } from 'express';
import { addToCart, getCart, updateCartItem, removeCartItem } from '../controllers/cart.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Add or update item in cart
router.post('/add', verifyJWT, addToCart);
// Get current user's cart
router.get('/', verifyJWT, getCart);
// Update cart item
router.put('/update', verifyJWT, updateCartItem);
// Remove cart item
router.delete('/remove', verifyJWT, removeCartItem);

export default router; 