import 'express-async-errors';
import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAllmatches);

export default router;
