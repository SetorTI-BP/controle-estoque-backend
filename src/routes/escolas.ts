import { Router } from 'express';
import { getEscolas, createEscola, deleteEscola } from '../controllers/escolasController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware);

router.get('/', getEscolas);
router.post('/', createEscola);
router.delete('/:id', deleteEscola);

export default router;
