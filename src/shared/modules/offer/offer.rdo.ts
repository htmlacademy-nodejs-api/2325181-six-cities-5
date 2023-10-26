import { Expose, Type } from 'class-transformer';
import { LocationType } from '../../types/location.type.js';
import { LodgingType } from '../../types/lodging.type.js';
import { GoodsType } from '../../types/goods.type.js';
import { UserRdo } from '../user/user.rdo.js';
import { CoordinatesType } from '../../types/coordinates.type.js';

export class OfferRdo {
  @Expose()
  public id: string;

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

  @Expose({name: 'hostId'})
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  public coordinates: CoordinatesType;

  @Expose()
  public reviews: number;
}
