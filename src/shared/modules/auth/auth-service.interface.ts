import { LoginUserDTO } from '../user/login-user.dto.js';
import { UserEntity } from '../user/user.entity.js';

export interface AuthService {
  authenticate (user: UserEntity): Promise<string>;
  verify (dto: LoginUserDTO): Promise<UserEntity>
}
