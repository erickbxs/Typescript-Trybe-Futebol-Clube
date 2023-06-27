import { NextFunction, Request, Response } from 'express';
import TokenGeneratorJwt from './tokenGeneratorJwt';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const tokenGeneratorJwt = new TokenGeneratorJwt();
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }
  const verifyToken = await tokenGeneratorJwt.verify(authorization);

  if (verifyToken === 'Token must be a valid token') {
    res.status(401).json({ message: verifyToken });
    return;
  }
  return next();
};

export default validateToken;
