import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatch extends IScore {
  id: number,
  homeTeam: number,
  awayTeam: number,
  inProgress?: boolean;
}

interface IMatchResponse extends IMatch {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}

class Match extends Model<IMatch> {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });
Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
export {
  IScore,
  IMatch,
  IMatchResponse,
};
