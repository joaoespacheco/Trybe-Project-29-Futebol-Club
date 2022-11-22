import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team.models';

class Match extends Model {
  id!: number;
  userName!: string;
  role!: string;
  email!: string;
  password!: string;
}

Match.init({
  id: {
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'matches' });
Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'team' });

Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'matches' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'team' });

export default Match;
