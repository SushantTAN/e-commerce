import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product';
import { auth, isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, isAdmin, createProduct);
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

export default router;
