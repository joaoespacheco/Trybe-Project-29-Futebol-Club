import HttpException from '../Utils/HttpException';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import validate from './validations/validate';
import { newMatchSchema } from './validations/schemas';
import { IMatch } from '../interfaces/IMatch';

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

  private getTeamsIds = async (): Promise<number[]> => {
    const allTeams = await Team.findAll();
    const teamsIds = allTeams.map(({ id }) => id);
    return teamsIds;
  };

  public postNewMatch = async (data: IMatch): Promise<Match> => {
    validate(newMatchSchema, data);
    if (data.homeTeam === data.awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    const teamsIds = await this.getTeamsIds();
    const verifyIds = [data.homeTeam, data.awayTeam].every((teamId) => teamsIds.includes(teamId));
    if (!verifyIds) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    const newMatch = await this._matchModel.create({ ...data, inProgress: true });
    return newMatch;
  };

  public finishMatch = async (id: number): Promise<void> => {
    const match = await this._matchModel.findByPk(id);
    if (!match) {
      throw new HttpException(404, 'There is no match with such id!');
    }
    await this._matchModel.update({ inProgress: false }, { where: { id } });
  };
}

export default MatchService;
