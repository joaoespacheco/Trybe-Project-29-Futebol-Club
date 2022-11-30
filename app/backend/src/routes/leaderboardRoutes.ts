import 'express-async-errors';
import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getHomeTeamsLeaderboard);
router.get('/away', leaderboardController.getAwayTeamsLeaderboard);
router.get('/', leaderboardController.getAllTeamsLeaderboard);

export default router;
