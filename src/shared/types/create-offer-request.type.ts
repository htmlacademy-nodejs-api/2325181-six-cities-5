import { Request} from 'express';
import { RequestBody, RequestParams } from './index.js';
import { CreateOfferDTO } from '../modules/offer/create-offer.dto.js';

export type CreateOfferRequestType = Request<RequestParams, RequestBody, CreateOfferDTO>;
