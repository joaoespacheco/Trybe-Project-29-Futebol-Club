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
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  timestamps: false,
});

export default User;
