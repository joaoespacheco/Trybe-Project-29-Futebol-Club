import 'express-async-errors';
import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAllmatches);
router.post('/', authMiddleware, matchController.postNewMatch);

export default router;
