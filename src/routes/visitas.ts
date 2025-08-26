import { Router } from 'express';
import { getVisitas, createVisita, deleteVisita } from '../controllers/visitasController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware);

router.get('/', getVisitas);
router.post('/', createVisita);
router.delete('/:id', deleteVisita);

export default router;
