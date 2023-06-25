import { verify } from 'jsonwebtoken';
import { IEmail } from '../database/Interfaces/Login.interface';
import UserModel from '../database/models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

class LoginService {
  constructor(private userModel = UserModel) {}

  public async login(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    return user || null;
  }

  public async verifyToken(authorization: string) {
    try {
      const { email } = verify(authorization, JWT_SECRET) as IEmail;
      const user = await this.userModel.findOne({ where: { email } });
      return user || null;
    } catch (error) {
      return null;
    }
  }
}

export default LoginService;
