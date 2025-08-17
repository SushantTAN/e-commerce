import { Router } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/order';
import { auth, isAdmin } from '../middlewares/auth';

const router = Router();

router.route('/')
  .get(auth, isAdmin, getAllOrders) // Only admin can get all orders
  .post(auth, createOrder); // Any logged-in user can create an order

router.route('/:id')
  .get(auth, getOrderById) // User can get their own order, admin can get any
  .put(auth, isAdmin, updateOrder) // Only admin can update any order
  .delete(auth, isAdmin); // Only admin can delete orders

export default router;
