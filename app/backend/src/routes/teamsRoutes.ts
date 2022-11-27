import 'express-async-errors';
import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);

export default router;
