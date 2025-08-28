    import { Router } from 'express';
    import { 
    getRetiradasByEscola, 
    createRetirada, 
    getDesperdicioByEscola, 
    createDesperdicio 
    } from '../controllers/desperdicioController';
    import { authMiddleware } from '../middleware/authMiddleware';

    const router = Router();
    router.use(authMiddleware);

    // Retiradas
    router.get('/retiradas', getRetiradasByEscola);
    router.get('/retiradas/:escolaId', getRetiradasByEscola);
    router.post('/retiradas', createRetirada);

    // Desperdício
    router.get('/desperdicio', getDesperdicioByEscola);
    router.get('/desperdicio/:escolaId', getDesperdicioByEscola);
    router.post('/desperdicio', createDesperdicio);

    export default router;