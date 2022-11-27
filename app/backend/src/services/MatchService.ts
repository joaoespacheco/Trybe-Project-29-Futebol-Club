import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  constructor(
    private _matchModel = Match,
  ) {}

  public getAll = async (): Promise<Match[]> => {
    const matches = await this._matchModel.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  };

  public getByProgress = async (inProgress: boolean): Promise<Match[]> => {
    const matches = await this._matchModel.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      where: { inProgress },
    });
    return matches;
  };
}

export default MatchService;
