import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../../../modules/offer/index.js';
import { FavoritesListType } from '../../../types/favorites-list.type.js';

export interface OfferAccess {
  findById(favoritesList: FavoritesListType, offerId:string): Promise<DocumentType<OfferEntity> | null>;
}
