import { LocationType, LodgingType, GoodsType } from '../../types/index.js';

export class CreateOfferDTO {
  public title: string;
  public description: string;
  public offerDate: Date;
  public city: LocationType;
  public previewImageURL: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: LodgingType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: GoodsType;
  public hostId: string;
  public reviews: number;
  public coordinates: number[];
}
