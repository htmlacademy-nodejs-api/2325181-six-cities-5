import { UserService } from './user-service.interface.js';
import { DocumentType } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';
import { CreateUserDTO } from './index.js';

export class DefaultUserService implements UserService {
  public async create (dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);
    return UserModel.create(user);
  }

  public findByEmail(email: string): Promise<DocumentType<UserEntity>> | null {

  }

  public findOrCreate(email: string, dto: createUserDTO): Promise<DocumentType<UserEntity>> {

  }


}
