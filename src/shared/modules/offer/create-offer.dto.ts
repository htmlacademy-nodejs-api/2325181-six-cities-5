import {IsDateString, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, Length, IsMongoId, IsNumber, IsBoolean, IsInt, ArrayUnique, ValidateNested, IsLatitude, IsLongitude, IsObject, Matches } from 'class-validator';
import { LocationType, LodgingType, GoodsType } from '../../types/index.js';
import { OfferValidationMessage, Goods, Location, LodgingKind } from '../../../const.js';
import { Type } from 'class-transformer';

export class Coordinates {

  @Type(() => Number)
  @IsNumber({}, {message: OfferValidationMessage.latitude.invalidFormat})
  @IsLatitude({message: OfferValidationMessage.latitude.invalidFormat})
    latitude!: number;

  @Type(() => Number)
  @IsNumber({}, {message: OfferValidationMessage.longitude.invalidFormat})
  @IsLongitude({message: OfferValidationMessage.longitude.invalidFormat})
    longitude!: number;
}

export class CreateOfferDTO {
  @Length(10, 100, {message: OfferValidationMessage.title.invalidLength})
  public title!: string;

  @Length(20, 1024, {message: OfferValidationMessage.title.invalidLength})
  public description!: string;

  @IsDateString({}, {message: OfferValidationMessage.offerDate.invalidFormat})
  public offerDate!: Date;

  @IsEnum(Location, {message: OfferValidationMessage.city.invalidValue})
  public city!: LocationType;

  @Matches(/(.png$|.jpg$)/i, {message: OfferValidationMessage.previewImageURL.invalidFormat})
  public previewImageURL!: string;

  @IsArray()
  @ArrayMinSize(6, {message: OfferValidationMessage.images.invalidCount})
  @ArrayMaxSize(6, {message: OfferValidationMessage.images.invalidCount})
  @Matches(/(.png$|.jpg$)/i, {each: true, message: OfferValidationMessage.images.invalidFormat})
  public images!: string[];

  @Type(() => Boolean)
  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium!: boolean;

  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.rating.invalidValue})
  @Max(5, {message: OfferValidationMessage.rating.invalidValue})
  @IsNumber({}, {message: OfferValidationMessage.rating.invalidFormat})
  public rating!: number;

  @IsEnum(LodgingKind, {message: OfferValidationMessage.type.invalidValue})
  public type!: LodgingType;

  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.bedrooms.invalidValue})
  @Max(8, {message: OfferValidationMessage.bedrooms.invalidValue})
  @IsInt({message: OfferValidationMessage.bedrooms.invalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.bedrooms.invalidFormat})
  public bedrooms!: number;

  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.maxAdults.invalidValue})
  @Max(10, {message: OfferValidationMessage.maxAdults.invalidValue})
  @IsInt({message: OfferValidationMessage.maxAdults.invalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.maxAdults.invalidFormat})
  public maxAdults!: number;

  @Type(() => Number)
  @Min(100, {message: OfferValidationMessage.price.invalidValue})
  @Max(100000, {message: OfferValidationMessage.price.invalidValue})
  @IsInt({message: OfferValidationMessage.price.invalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.price.invalidFormat})
  public price!: number;

  @IsArray({message: OfferValidationMessage.goods.invalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.goods.invalidValue})
  @ArrayMinSize(1, {message: OfferValidationMessage.goods.emptyArray})
  @ArrayUnique({message: OfferValidationMessage.goods.uniqueValues})
  public goods!: GoodsType;

  @IsMongoId({message: OfferValidationMessage.hostId.invalidValue})
  public hostId!: string;

  @IsObject({message: OfferValidationMessage.coordinates.invalidValue})
  @ValidateNested({message: OfferValidationMessage.coordinates.invalidValue})
  @Type(() => Coordinates)
  public coordinates!: Coordinates;
}
