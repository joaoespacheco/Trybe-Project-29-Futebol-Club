import ILogin from './ILogin';

interface IUser extends ILogin {
  id: number,
  userName: string,
  role: string,
}

export default IUser;
