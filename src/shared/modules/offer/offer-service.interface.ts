import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO, OfferEntity, UpdateOfferDTO } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDTO):Promise<DocumentType<OfferEntity>>;
  findById(offerId:string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number):Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId:string):Promise<DocumentType<OfferEntity> | null>;
  findFavorites():Promise<DocumentType<OfferEntity>[]>;
  findPremium():Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId:string, dto: UpdateOfferDTO):Promise<DocumentType<OfferEntity> | null>;
  addRemoveFavorites(offerId: string, isSetFavorite: boolean):Promise<DocumentType<OfferEntity> | null>;
}
