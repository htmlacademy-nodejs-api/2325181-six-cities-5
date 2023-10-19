import { Ref, DocumentType } from '@typegoose/typegoose';
import { UserEntity, CreateUserDTO, UpdateUserDTO } from './index.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface UserService {
  create (dto: CreateUserDTO, salt: string):Promise<DocumentType<UserEntity>>;
  findById (userId: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail (email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate (dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  updateById (userId: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null>;
  addRemoveFavorites (userId: string, offer: Ref<OfferEntity>, isSetFavorite: boolean): Promise<DocumentType<UserEntity> | null>
}
