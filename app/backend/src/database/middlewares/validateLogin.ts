import { NextFunction, Request, Response } from 'express';

const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!regex.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length <= 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default { validateEmail, validatePassword };
