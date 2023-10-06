import { DocumentType } from '@typegoose/typegoose';
import { UserEntity, CreateUserDTO } from './index.js';

export interface UserService {
  create (dto: CreateUserDTO, salt: string):Promise<DocumentType<UserEntity>>;
  findById (userId: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail (email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate (dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
}
