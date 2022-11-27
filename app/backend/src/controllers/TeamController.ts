import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import ITeamController from '../interfaces/ITeamController';

class TeamController implements ITeamController {
  constructor(private _teamService = new TeamService()) { }

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this._teamService.getAll();
    res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teams = await this._teamService.getById(Number(id));
    res.status(200).json(teams);
  };
}

export default TeamController;
