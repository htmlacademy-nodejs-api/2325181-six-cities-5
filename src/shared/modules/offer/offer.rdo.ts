import { Expose } from 'class-transformer';
import { LocationType } from '../../types/location.type.js';
import { LodgingType } from '../../types/lodging.type.js';
import { GoodsType } from '../../types/goods.type.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public offerDate: Date;

  @Expose()
  public city: LocationType;

  @Expose()
  public previewImageURL: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: LodgingType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: GoodsType;

  @Expose()
  public hostId: string;

  @Expose()
  public coordinates: number[];

  @Expose()
  public reviews: number;
}
