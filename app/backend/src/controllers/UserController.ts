import { Request, Response } from 'express';
import UserService from '../services/UserService';
import ILogin from '../interfaces/ILogin';
import IUserController from '../interfaces/IUserController';

class UserController implements IUserController {
  constructor(private _userService = new UserService()) { }

  public login = async (req: Request<ILogin>, res: Response) => {
    const token = await this._userService.login(req.body);
    res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response) => {
    const { user } = req.body;
    res.status(200).json({ role: user.role });
  };
}

export default UserController;
