import { CoordinatesType } from './coordinates.type.js';
import { GoodsType } from './goods.type.js';
import { LocationType } from './location.type.js';
import { LodgingType } from './lodging.type.js';
import { UserType } from './user.type.js';

export type OfferType = {
  title: string;
  description: string;
  city: LocationType;
  previewImageURL: string;
  images: string[];
  isPremium: boolean;
  type: LodgingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: GoodsType;
  host: UserType;
  coordinates: CoordinatesType;
}
