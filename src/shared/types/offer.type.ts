import { GoodsType } from './goods.type.js';
import { LocationType } from './location.type.js';
import { LodgingType } from './lodging.type.js';

export type Offer = {
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
  host: string;
  reviews: number;
  coordinates: number[];
}
