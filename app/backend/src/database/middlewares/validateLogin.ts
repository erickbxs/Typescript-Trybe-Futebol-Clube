import { Request, Response, NextFunction } from 'express';
import statusHTTP from '../../utils/statusHTTP';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  const { email, password } = req.body;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!email || !password) {
    return res.status(statusHTTP('INVALID_DATA')).json({ message: 'All fields must be filled' });
  }

  if (!emailRegex.test(email)) {
    return res.status(statusHTTP('UNAUTHORIZED')).json({
      message: 'Invalid email or password',
    });
  }

  if (password.length < 6) {
    return res.status(statusHTTP('UNAUTHORIZED')).json({ message: 'Invalid email or password' });
  }

  return next();
};
