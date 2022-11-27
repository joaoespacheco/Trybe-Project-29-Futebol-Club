import HttpException from '../Utils/HttpException';
import Team from '../database/models/Team';

class UserService {
  constructor(
    private _teamModel = Team,
  ) {}

  public getAll = async (): Promise<Team[]> => {
    const teams = await this._teamModel.findAll();
    return teams;
  };

  public getById = async (id: number): Promise<Team> => {
    const team = await this._teamModel.findByPk(id);
    if (!team) {
      throw new HttpException(401, 'Team not found');
    }
    return team;
  };
}

export default UserService;
