import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { IEmail } from '../../Interfaces/Login.interface';
import UserModel from '../models/UserModel';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const decoded = decode(authorization as string);
  if (!decoded) {
    return res.status(401).json({ message: 'Token not found' }); // Alterei o message que era Token must be valid token
  }
  const { email } = decoded as IEmail;
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
