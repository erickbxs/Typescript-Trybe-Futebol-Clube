import { User } from './user/User.interface';

export interface TokenGenerator {
  generate(user: User): string;
}
