import { Router } from 'express';
import { getProdutos, createProduto, deleteProduto } from '../controllers/produtosController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware);

router.get('/', getProdutos);
router.post('/', createProduto);
router.delete('/:id', deleteProduto);

export default router;
