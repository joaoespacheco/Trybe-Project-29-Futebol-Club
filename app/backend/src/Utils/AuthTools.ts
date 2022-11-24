import * as jsonwebtoken from 'jsonwebtoken';
import IAuthTools from '../interfaces/IAuthTools';
import HttpException from './HttpException';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtDefaultConfig: jsonwebtoken.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

class AuthTools implements IAuthTools {
  public generateToken = async (payload: { id: number, role: string }) => (
    jsonwebtoken.sign(payload, SECRET, jwtDefaultConfig)
  );

  public cryptVerify = async (token: string) => {
    const payload = await jsonwebtoken.verify(token, SECRET);
    return payload;
  };

  public authenticateToken = async (token: string) => {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }

    try {
      const payload = this.cryptVerify(token);
      return await payload;
    } catch (e) {
      throw new HttpException(401, 'token inválido');
    }
  };
}

export default AuthTools;
