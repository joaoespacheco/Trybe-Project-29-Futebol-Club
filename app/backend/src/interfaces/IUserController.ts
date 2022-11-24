import { Request, Response } from 'express';
import ILogin from './ILogin';

interface IUserController {
  login(req: Request<ILogin>, res: Response): void
}

export default IUserController;
