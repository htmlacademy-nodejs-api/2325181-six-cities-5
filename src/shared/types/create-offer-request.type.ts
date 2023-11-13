import { Request} from 'express';
import { RequestBody, RequestParams, CreateOfferRequestDTO } from '../index.js';

export type CreateOfferRequestType = Request<RequestParams, RequestBody, CreateOfferRequestDTO>;
