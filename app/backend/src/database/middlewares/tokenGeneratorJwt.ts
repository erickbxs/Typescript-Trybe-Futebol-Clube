import * as jwt from 'jsonwebtoken';
import { User } from '../../Interfaces/user/User.interface';
import { TokenGenerator } from '../../Interfaces/TokenGenerator';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;

  generate(user: User): string {
    const { role, email } = user;
    const token = this.jwt.sign({ email, role }, 'jwt_secret');
    return token;
  }

  verify(token: string): string | object {
    try {
      const decoded = this.jwt.verify(token, 'jwt_secret');
      return decoded;
    } catch (_error) {
      return 'Token must be a valid token';
    }
  }
}
