import 'express-async-errors';
import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAllmatches);
router.post('/', authMiddleware, matchController.postNewMatch);
router.patch('/:id/finish', authMiddleware, matchController.finishMatch);
router.patch('/:id', authMiddleware, matchController.updateScore);

export default router;
