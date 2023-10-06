import { GoodsType } from './goods.type.js';
import { LocationType } from './location.type.js';
import { LodgingType } from './lodging.type.js';
import { UserType } from './user.type.js';

export type OfferType = {
  title: string;
  description: string;
  offerDate: Date;
  city: LocationType;
  previewImageURL: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: LodgingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: GoodsType;
  host: UserType;
  reviews: number;
  coordinates: number[];
}
