import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './product';
import userRoutes from './user';
import orderRoutes from './order'; // Import order routes

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/user', userRoutes);
router.use('/orders', orderRoutes); // Add order routes

export default router;
