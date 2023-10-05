import { DocumentType } from '@typegoose/typegoose';
import { UserEntity, createUserDTO } from './index.js';

export interface UserService {
  create (dto: createUserDTO, salt: string):Promise<DocumentType<UserEntity>>;
  findByEmail (email: string): Promise<DocumentType<UserEntity>> | null;
  findOrCreate (email: string, dto: createUserDTO): Promise<DocumentType<UserEntity>>;
}
