import { ParamsDictionary} from 'express-serve-static-core';
import { LocationType } from './index.js';

export type ParamOfferType = {
  offerId?: string;
  city?: LocationType;
} | ParamsDictionary;
