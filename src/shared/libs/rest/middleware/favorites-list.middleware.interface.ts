import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from '../../../modules/user/index.js';

export interface FavoritesList {
  findById (userId: string): Promise<DocumentType<UserEntity> | null>;
}
