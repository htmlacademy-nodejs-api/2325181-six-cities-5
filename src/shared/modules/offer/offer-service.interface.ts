import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO, OfferEntity, UpdateOfferDTO } from './index.js';

export interface OfferService {
  create(dto: CreateOfferDTO):Promise<DocumentType<OfferEntity>>;
  findById(token: string, offerId:string): Promise<DocumentType<OfferEntity> | null>;
  find(token: string, count?: number):Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId:string):Promise<DocumentType<OfferEntity> | null>;
  findPremium(city: string):Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId:string, dto: UpdateOfferDTO):Promise<DocumentType<OfferEntity> | null>;
}
