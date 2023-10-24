import {IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, Length, IsMongoId, IsNumber, IsBoolean } from 'class-validator';
import { LocationType, LodgingType, GoodsType } from '../../types/index.js';
import { OfferValidationMessage, Goods, Location, LodgingKind } from '../../../const.js';

export class CreateOfferDTO {
  @Length(10, 100, {message: OfferValidationMessage.title.invalidLength})
  public title: string;

  @Length(20, 1024, {message: OfferValidationMessage.title.invalidLength})
  public description: string;

  @IsDateString({}, {message: OfferValidationMessage.offerDate.invalidFormat})
  public offerDate: Date;

  @IsEnum({Location, message: OfferValidationMessage.city.invalidValue})
  public city: LocationType;

  public previewImageURL: string;

  @ArrayMinSize(6, {message: OfferValidationMessage.images.invalidCount})
  @ArrayMaxSize(6, {message: OfferValidationMessage.images.invalidCount})
  public images: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @Min(1, {message: OfferValidationMessage.rating.invalidValue})
  @Max(5, {message: OfferValidationMessage.rating.invalidValue})
  public rating: number;

  @IsEnum({LodgingKind, message: OfferValidationMessage.type.invalidValue})
  public type: LodgingType;

  @Min(1, {message: OfferValidationMessage.bedrooms.invalidValue})
  @Max(8, {message: OfferValidationMessage.bedrooms.invalidValue})
  public bedrooms: number;

  @Min(1, {message: OfferValidationMessage.maxAdults.invalidValue})
  @Max(10, {message: OfferValidationMessage.maxAdults.invalidValue})
  public maxAdults: number;

  @Min(100, {message: OfferValidationMessage.price.invalidValue})
  @Max(100000, {message: OfferValidationMessage.price.invalidValue})
  public price: number;

  @IsArray({message: OfferValidationMessage.goods.invalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.goods.invalidValue})
  public goods: GoodsType;

  @IsMongoId({message: OfferValidationMessage.hostId.invalidValue})
  public hostId: string;

  @IsArray({message: OfferValidationMessage.coordinates.invalidValue})
  @IsNumber({}, {each: true, message: OfferValidationMessage.coordinates.invalidValue})
  public coordinates: number[];
}
