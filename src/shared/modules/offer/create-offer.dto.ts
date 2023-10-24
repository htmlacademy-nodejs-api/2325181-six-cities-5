import {IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, Length, IsMongoId, IsNumber } from 'class-validator';
import { LocationType, LodgingType, GoodsType } from '../../types/index.js';
import { CreateOfferValidationMessage, Goods, Location, LodgingKind } from '../../../const.js';

export class CreateOfferDTO {
  @Length(10, 100, {message: CreateOfferValidationMessage.title.minLength})
  public title: string;

  @Length(20, 1024, {message: CreateOfferValidationMessage.title.minLength})
  public description: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.offerDate.invalidFormat})
  public offerDate: Date;

  @IsEnum({Location, message: CreateOfferValidationMessage.city.invalidValue})
  public city: LocationType;

  public previewImageURL: string;

  @ArrayMinSize(6, {message: CreateOfferValidationMessage.images.invalidCount})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.images.invalidCount})
  public images: string[];

  public isPremium: boolean;

  @Min(1, {message: CreateOfferValidationMessage.rating.invalidValue})
  @Max(5, {message: CreateOfferValidationMessage.rating.invalidValue})
  public rating: number;

  @IsEnum({LodgingKind, message: CreateOfferValidationMessage.type.invalidValue})
  public type: LodgingType;

  @Min(1, {message: CreateOfferValidationMessage.bedrooms.invalidValue})
  @Max(8, {message: CreateOfferValidationMessage.bedrooms.invalidValue})
  public bedrooms: number;

  @Min(1, {message: CreateOfferValidationMessage.maxAdults.invalidValue})
  @Max(10, {message: CreateOfferValidationMessage.maxAdults.invalidValue})
  public maxAdults: number;

  @Min(100, {message: CreateOfferValidationMessage.price.invalidValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.invalidValue})
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.goods.invalidValue})
  @IsEnum(Goods, {each: true, message: CreateOfferValidationMessage.goods.invalidValue})
  public goods: GoodsType;

  @IsMongoId({message: CreateOfferValidationMessage.hostId.invalidValue})
  public hostId: string;

  @IsArray({message: CreateOfferValidationMessage.coordinates.invalidValue})
  @IsNumber({}, {each: true, message: CreateOfferValidationMessage.coordinates.invalidValue})
  public coordinates: number[];
}
