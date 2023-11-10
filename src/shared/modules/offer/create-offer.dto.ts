import {IsString, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, Length, IsMongoId, IsNumber, IsBoolean, IsInt, ArrayUnique, ValidateNested, IsLatitude, IsLongitude, IsObject, Matches } from 'class-validator';
import { LocationType, LodgingType, GoodsType } from '../../types/index.js';
import { OfferValidationMessage, Goods, Location, LodgingKind } from '../../../const.js';
import { Type } from 'class-transformer';

export class Coordinates {

  @Type(() => Number)
  @IsNumber({}, {message: OfferValidationMessage.Latitude.InvalidFormat})
  @IsLatitude({message: OfferValidationMessage.Latitude.InvalidFormat})
    latitude!: number;

  @Type(() => Number)
  @IsNumber({}, {message: OfferValidationMessage.Longitude.InvalidFormat})
  @IsLongitude({message: OfferValidationMessage.Longitude.InvalidFormat})
    longitude!: number;
}

export class CreateOfferDTO {
  @Length(10, 100, {message: OfferValidationMessage.Title.InvalidLength})
  public title!: string;

  @Length(20, 1024, {message: OfferValidationMessage.Title.InvalidLength})
  public description!: string;

  @IsEnum(Location, {message: OfferValidationMessage.City.InvalidValue})
  public city!: LocationType;

  @IsString()
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {each: true, message: OfferValidationMessage.PreviewImageURL.InvalidFormat})
  public previewImageURL!: string;

  @IsArray()
  @ArrayMinSize(6, {message: OfferValidationMessage.Images.InvalidCount})
  @ArrayMaxSize(6, {message: OfferValidationMessage.Images.InvalidCount})
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {each: true, message: OfferValidationMessage.Images.InvalidFormat})
  public images!: string[];

  @Type(() => Boolean)
  @IsBoolean({message: OfferValidationMessage.IsPremium.InvalidFormat})
  public isPremium!: boolean;

  @IsEnum(LodgingKind, {message: OfferValidationMessage.Type.InvalidValue})
  public type!: LodgingType;

  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.Bedrooms.InvalidValue})
  @Max(8, {message: OfferValidationMessage.Bedrooms.InvalidValue})
  @IsInt({message: OfferValidationMessage.Bedrooms.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.Bedrooms.InvalidFormat})
  public bedrooms!: number;

  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.MaxAdults.InvalidValue})
  @Max(10, {message: OfferValidationMessage.MaxAdults.InvalidValue})
  @IsInt({message: OfferValidationMessage.MaxAdults.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.MaxAdults.InvalidFormat})
  public maxAdults!: number;

  @Type(() => Number)
  @Min(100, {message: OfferValidationMessage.Price.InvalidValue})
  @Max(100000, {message: OfferValidationMessage.Price.InvalidValue})
  @IsInt({message: OfferValidationMessage.Price.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.Price.InvalidFormat})
  public price!: number;

  @IsArray({message: OfferValidationMessage.Goods.InvalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.Goods.InvalidValue})
  @ArrayMinSize(1, {message: OfferValidationMessage.Goods.EmptyArray})
  @ArrayUnique({message: OfferValidationMessage.Goods.UniqueValues})
  public goods!: GoodsType;

  @IsMongoId({message: OfferValidationMessage.HostId.InvalidValue})
  public hostId!: string;

  @IsObject({message: OfferValidationMessage.Coordinates.InvalidValue})
  @ValidateNested({message: OfferValidationMessage.Coordinates.InvalidValue})
  @Type(() => Coordinates)
  public coordinates!: Coordinates;
}
