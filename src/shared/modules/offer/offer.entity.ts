/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { prop, getModelForClass, defaultClasses, modelOptions, Ref } from '@typegoose/typegoose';
import { LocationType, LodgingType, GoodsType } from '../../types/index.js';
import { Goods, Location, LodgingKind } from '../../../const.js';
import { UserEntity } from '../user/user.entity.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop ({
    required: true,
    default: '',
    trim: true
  }) public title!: string;

  @prop ({
    default: '',
    required: false,
    trim: true
  }) public description!: string;

  @prop ({
    required: false
  })
  public offerDate!: Date;

  @prop ({
    type: () => String,
    enum: Object.values(Location),
    required: true,
  }) public city!: LocationType;

  @prop ({
    required: false,
    default: ''
  }) public previewImageURL!: string;

  @prop ({
    required: false,
    default: []
  }) public images!: string[];

  @prop ({
    required: false,
    default: false
  }) public isPremium!: boolean;

  @prop ({
    required: false,
    default: false
  }) public isFavorite!: boolean;

  @prop ({
    required: false,
    default: 0
  }) public rating!: number;

  @prop ({
    required: true,
    type: () => String,
    enum: Object.values(LodgingKind)
  }) public type!: LodgingType;

  @prop ({
    required: false,
    default: 0
  }) public bedrooms!: number;

  @prop ({
    required: false,
    default: 0
  }) public maxAdults!: number;

  @prop ({
    required: false,
    default: 0
  }) public price!: number;

  @prop ({
    required: false,
    type: () => String,
    enum: Object.values(Goods),
    default: []
  }) public goods!: GoodsType;

  @prop ({
    required: true,
    ref: UserEntity,
    _id: false,
  }) public hostId!: Ref<UserEntity>;

  @prop ({
    required: false,
    default: 0
  }) public reviews!: number;

  @prop ({
    required: false,
    default: []
  }) public coordinates!: number[];

}

export const OfferModel = getModelForClass(OfferEntity);
