import * as jsonwebtoken from 'jsonwebtoken';

interface IAuthTools {
  generateToken(payload: { id: number, role: string }): Promise<string>;
  cryptVerify(token: string): Promise<string | jsonwebtoken.JwtPayload>
  authenticateToken(token: string): Promise<string | jsonwebtoken.JwtPayload>
}

export default IAuthTools;
