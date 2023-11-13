import { LoginUserDTO, UserEntity } from '../../index.js';

export interface AuthService {
  authenticate (user: UserEntity): Promise<string>;
  verify (dto: LoginUserDTO): Promise<UserEntity>
}
