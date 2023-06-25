import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import User from '../database/models/UserModel';
import LoginService from '../services/login.service';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const JWT_OPTIONS: SignOptions = {
  expiresIn: '6d',
  algorithm: 'HS256',
};

const MESSAGE = 'Incorrect email or password';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  public async loginToken(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.loginService.login(email);
    if (!user) {
      return res.status(401).json({ message: MESSAGE });
    }

    const compare = compareSync(password, user.password);
    if (!compare) {
      return res.status(401).json({ message: MESSAGE });
    }

    const token = sign({ email }, JWT_SECRET, JWT_OPTIONS);
    return res.status(200).json({ token });
  }

  public async authToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: MESSAGE });
    }

    const user = await this.loginService.verifyToken(authorization as string) as User;
    if (!user) {
      return res.status(401).json({ message: MESSAGE });
    }

    return res.status(200).json({ role: user.role });
  }
}

export default LoginController;
