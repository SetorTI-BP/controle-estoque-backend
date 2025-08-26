// src/routes/estoque.ts
import { Router } from 'express';
import { getEstoqueByVisita, createOrUpdateEstoque, deleteEstoqueItem } from '../controllers/estoqueController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Todas rotas protegidas
router.use(authMiddleware);

// Listar por visita
router.get('/:visitaId', getEstoqueByVisita);

// Criar ou atualizar (envie id para atualizar)
router.post('/', createOrUpdateEstoque);

// Deletar item de estoque
router.delete('/:id', deleteEstoqueItem);

export default router;
