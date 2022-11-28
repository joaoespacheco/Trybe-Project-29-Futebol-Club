import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private _matchService = new MatchService()) { }

  public getAllmatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    let matches = [];
    if (inProgress === 'true' || inProgress === 'false') {
      matches = await this._matchService.getByProgress(inProgress === 'true');
    } else {
      matches = await this._matchService.getAll();
    }

    res.status(200).json(matches);
  };

  public postNewMatch = async (req: Request, res: Response) => {
    const { user, ...body } = req.body;
    const newMatch = await this._matchService.postNewMatch(body);

    res.status(201).json(newMatch);
  };
}

export default MatchController;
