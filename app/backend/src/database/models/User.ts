import { Model, INTEGER, STRING } from 'sequelize';
import IUser from '../../interfaces/IUser';
import db from '.';

class User extends Model implements IUser {
  id!: number;
  userName!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
