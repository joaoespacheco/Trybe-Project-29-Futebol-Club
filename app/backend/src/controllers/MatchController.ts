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
}

export default MatchController;
