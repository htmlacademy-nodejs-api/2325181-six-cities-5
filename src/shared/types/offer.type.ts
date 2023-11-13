import { CoordinatesType, GoodsType, LocationType, LodgingType, UserType } from './index.js';


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
