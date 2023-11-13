import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity, FavoritesListType } from '../../../index.js';

export interface OfferAccess {
  findById(favoritesList: FavoritesListType, offerId:string): Promise<DocumentType<OfferEntity> | null>;
}
