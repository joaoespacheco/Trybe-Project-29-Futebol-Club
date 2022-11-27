import { Request, Response } from 'express';

interface ITeamController {
  getAllTeams(req: Request, res: Response): void
}

export default ITeamController;
