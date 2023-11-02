import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO, OfferEntity, UpdateOfferDTO } from './index.js';
import { FavoritesListType } from '../../types/favorites-list.type.js';

export interface OfferService {
  create(dto: CreateOfferDTO):Promise<DocumentType<OfferEntity>>;
  findById(favoritesList: FavoritesListType, offerId:string): Promise<DocumentType<OfferEntity> | null>;
  find(favoritesList: FavoritesListType, count?: number):Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId:string):Promise<DocumentType<OfferEntity> | null>;
  findPremium(favoritesList: FavoritesListType, city: string):Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId:string, dto: UpdateOfferDTO):Promise<DocumentType<OfferEntity> | null>;
  findFavorites(favoritesList: FavoritesListType):Promise<DocumentType<OfferEntity>[]>;
  exists(offerId: string): Promise<boolean>;
}
