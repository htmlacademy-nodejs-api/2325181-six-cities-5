import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO, OfferEntity, FavoritesOfferDTO, UpdateOfferDTO } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDTO):Promise<DocumentType<OfferEntity>>;
  findById(offerId:string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number):Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId:string):Promise<DocumentType<OfferEntity> | null>;
  findFavorites():Promise<DocumentType<OfferEntity>[]>;
  findPremium():Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId:string, dto: UpdateOfferDTO):Promise<DocumentType<OfferEntity> | null>;
  addRemoveFavorites(offerId: string, dto: FavoritesOfferDTO):Promise<DocumentType<OfferEntity> | null>;
}
