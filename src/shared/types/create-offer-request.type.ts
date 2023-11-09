import { Request} from 'express';
import { RequestBody, RequestParams } from './index.js';
import { CreateOfferRequestDTO } from '../modules/offer/create-offer-request.dto.js';

export type CreateOfferRequestType = Request<RequestParams, RequestBody, CreateOfferRequestDTO>;
