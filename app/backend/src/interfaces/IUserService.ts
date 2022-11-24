import ILogin from './ILogin';

interface IUserService {
  login(login: ILogin): Promise<string>
}

export default IUserService;
