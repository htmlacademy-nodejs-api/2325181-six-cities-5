import { ParamsDictionary} from 'express-serve-static-core';
import { LocationType } from './location.type.js';

export type ParamOfferType = {
  offerId?: string;
  city?: LocationType;
} | ParamsDictionary;
