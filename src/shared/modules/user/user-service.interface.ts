import { DocumentType } from '@typegoose/typegoose';
import { UserEntity, CreateUserDTO } from './index.js';

export interface UserService {
  create (dto: CreateUserDTO, salt: string):Promise<DocumentType<UserEntity>>;
  findByEmail (email: string): Promise<DocumentType<UserEntity>> | null;
  findOrCreate (email: string, dto: CreateUserDTO): Promise<DocumentType<UserEntity>>;
}
