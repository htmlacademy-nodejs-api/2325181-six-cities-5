import { Expose, Type } from 'class-transformer';
import { LocationType, LodgingType, GoodsType, UserRdo, CoordinatesType } from '../../../index.js';

export class OfferRdo {
  @Expose({name: '_id'})
  @Type(() => String)
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({name: 'createdAt'})
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

  @Expose({name: 'hostId'})
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  public coordinates: CoordinatesType;

  @Expose()
  public reviews: number;
}
