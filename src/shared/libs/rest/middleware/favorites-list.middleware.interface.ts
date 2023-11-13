import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../../../index.js';

export interface FavoritesList {
  findById (userId: string): Promise<DocumentType<UserEntity> | null>;
}
