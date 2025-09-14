import { Router } from 'express';
import { auth, isAdmin } from '../middlewares/auth';
import { getCart, addToCart, getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, checkout } from '../controllers/order';

const router = Router();

// Cart routes
router.get('/cart', auth, getCart);
router.post('/cart/add', auth, addToCart);

// Order routes
router.get('/', auth, getAllOrders);
router.get('/:id', auth, getOrderById);
router.post('/', auth, createOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, isAdmin, deleteOrder);

// Checkout route
router.post('/checkout', auth, checkout);

export default router;
