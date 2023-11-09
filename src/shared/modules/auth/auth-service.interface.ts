import { LoginUserDTO } from '../user/index.js';
import { UserEntity } from '../user/index.js';

export interface AuthService {
  authenticate (user: UserEntity): Promise<string>;
  verify (dto: LoginUserDTO): Promise<UserEntity>
}
