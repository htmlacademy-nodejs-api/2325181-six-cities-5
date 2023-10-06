import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO } from './create-offer.dto.js';


export interface OfferService {
  create(dto: CreateOfferDTO, salt: string):Promise<DocumentType<
}
