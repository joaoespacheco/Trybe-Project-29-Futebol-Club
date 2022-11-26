import * as jsonwebtoken from 'jsonwebtoken';
import IAuthTools from '../interfaces/IAuthTools';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtDefaultConfig: jsonwebtoken.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

class AuthTools implements IAuthTools {
  public generateToken = async (payload: { id: number, role: string }) => (
    jsonwebtoken.sign(payload, SECRET, jwtDefaultConfig)
  );
}

export default AuthTools;
