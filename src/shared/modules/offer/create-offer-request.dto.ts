import {IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, Length, IsNumber, IsBoolean, IsInt, ArrayUnique, ValidateNested, IsObject, Matches, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationType, LodgingType, GoodsType } from '../../types/index.js';
import { OfferValidationMessage, Goods, Location, LodgingKind } from '../../../const.js';
import { Coordinates } from './create-offer.dto.js';

export class CreateOfferRequestDTO {
  @Length(10, 100, {message: OfferValidationMessage.Title.InvalidLength})
  public title!: string;

  @Length(20, 1024, {message: OfferValidationMessage.Title.InvalidLength})
  public description!: string;

  @IsEnum(Location, {message: OfferValidationMessage.City.InvalidValue})
  public city!: LocationType;

  @IsString()
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {each: true, message: OfferValidationMessage.PreviewImageURL.InvalidFormat})
  public previewImageURL?: string;

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

  @IsObject({message: OfferValidationMessage.Coordinates.InvalidValue})
  @ValidateNested({message: OfferValidationMessage.Coordinates.InvalidValue})
  @Type(() => Coordinates)
  public coordinates!: Coordinates;
}
