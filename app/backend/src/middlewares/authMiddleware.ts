import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../Utils/HttpException';

async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;
  if (!token) {
    throw new HttpException(401, 'Token not found');
  }
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = payload;
    next();
  } catch (err) {
    throw new HttpException(401, 'Invalid token');
  }
}

export default authMiddleware;
