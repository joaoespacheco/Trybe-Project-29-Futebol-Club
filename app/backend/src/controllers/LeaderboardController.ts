import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) { }

  public getHomeTeamsLeaderboard = async (_req: Request, res: Response) => {
    const homeTeamsBoard = await this._leaderboardService.getLeaderboard('home');
    res.status(200).json(homeTeamsBoard);
  };

  public getAwayTeamsLeaderboard = async (_req: Request, res: Response) => {
    const homeTeamsBoard = await this._leaderboardService.getLeaderboard('away');
    res.status(200).json(homeTeamsBoard);
  };

  public getAllTeamsLeaderboard = async (_req: Request, res: Response) => {
    const homeTeamsBoard = await this._leaderboardService.getLeaderboard('all');
    res.status(200).json(homeTeamsBoard);
  };
}

export default LeaderboardController;
