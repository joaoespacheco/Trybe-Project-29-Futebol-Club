import { compare } from 'bcryptjs';
import AuthTools from '../Utils/AuthTools';
import IUserService from '../interfaces/IUserService';
import HttpException from '../Utils/HttpException';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import validate from './validations/validate';
import { loginSchema } from './validations/schemas';

class UserService implements IUserService {
  constructor(
    private _userModel = User,
    private _authTools = new AuthTools(),
  ) {}

  public login = async (login: ILogin): Promise<string> => {
    validate(loginSchema, login);
    const user = await this._userModel.findOne({ where: {
      email: login.email,
    } });
    if (!user || !(await compare(login.password, user.password))) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const token = this._authTools.generateToken({ id: user.id, role: user.role });

    return token;
  };
}

export default UserService;
