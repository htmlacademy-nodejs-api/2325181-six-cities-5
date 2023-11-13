import {IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, Length, IsNumber, IsBoolean, IsInt, ArrayUnique, ValidateNested, IsObject, Matches, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationType, LodgingType, GoodsType, CoordinatesType, Coordinates } from '../../../index.js';
import { OfferValidationMessage, Goods, Location, LodgingKind, OfferValidationParameters } from '../../../../const.js';

export class CreateOfferRequestDTO {
  @Length(
    OfferValidationParameters.Title.Length.Minimum,
    OfferValidationParameters.Title.Length.Maximum,
    {message: OfferValidationMessage.Title.InvalidLength}
  )
  public title!: string;

  @Length(
    OfferValidationParameters.Description.Length.Minimum,
    OfferValidationParameters.Description.Length.Maximum,
    {message: OfferValidationMessage.Title.InvalidLength}
  )
  public description!: string;

  @IsEnum(Location, {message: OfferValidationMessage.City.InvalidValue})
  public city!: LocationType;

  @IsString()
  @Matches(
    OfferValidationParameters.PreviewImageURL.MatchRegex,
    {each: true, message: OfferValidationMessage.PreviewImageURL.InvalidFormat}
  )
  public previewImageURL!: string;

  @IsArray()
  @ArrayMinSize(
    OfferValidationParameters.Images.ListLength.Minimum,
    {message: OfferValidationMessage.Images.InvalidCount}
  )
  @ArrayMaxSize(
    OfferValidationParameters.Images.ListLength.Maximum,
    {message: OfferValidationMessage.Images.InvalidCount}
  )
  @Matches(
    OfferValidationParameters.Images.MatchRegex,
    {each: true, message: OfferValidationMessage.Images.InvalidFormat}
  )
  public images!: string[];

  @Type(() => Boolean)
  @IsBoolean({message: OfferValidationMessage.IsPremium.InvalidFormat})
  public isPremium!: boolean;

  @IsEnum(LodgingKind, {message: OfferValidationMessage.Type.InvalidValue})
  public type!: LodgingType;

  @Type(() => Number)
  @Min(
    OfferValidationParameters.Bedrooms.Value.Minimum,
    {message: OfferValidationMessage.Bedrooms.InvalidValue}
  )
  @Max(
    OfferValidationParameters.Bedrooms.Value.Maximum,
    {message: OfferValidationMessage.Bedrooms.InvalidValue}
  )
  @IsInt({message: OfferValidationMessage.Bedrooms.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.Bedrooms.InvalidFormat})
  public bedrooms!: number;

  @Type(() => Number)
  @Min(
    OfferValidationParameters.MaxAdults.Value.Minimum,
    {message: OfferValidationMessage.MaxAdults.InvalidValue}
  )
  @Max(
    OfferValidationParameters.MaxAdults.Value.Maximum,
    {message: OfferValidationMessage.MaxAdults.InvalidValue}
  )
  @IsInt({message: OfferValidationMessage.MaxAdults.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.MaxAdults.InvalidFormat})
  public maxAdults!: number;

  @Type(() => Number)
  @Min(
    OfferValidationParameters.Price.Value.Minimum,
    {message: OfferValidationMessage.Price.InvalidValue}
  )
  @Max(
    OfferValidationParameters.Price.Value.Maximum,
    {message: OfferValidationMessage.Price.InvalidValue}
  )
  @IsInt({message: OfferValidationMessage.Price.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.Price.InvalidFormat})
  public price!: number;

  @IsArray({message: OfferValidationMessage.Goods.InvalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.Goods.InvalidValue})
  @ArrayMinSize(
    OfferValidationParameters.Goods.ListLength.Minimum,
    {message: OfferValidationMessage.Goods.EmptyArray}
  )
  @ArrayUnique({message: OfferValidationMessage.Goods.UniqueValues})
  public goods!: GoodsType;

  @IsObject({message: OfferValidationMessage.Coordinates.InvalidValue})
  @ValidateNested({message: OfferValidationMessage.Coordinates.InvalidValue})
  @Type(() => Coordinates)
  public coordinates!: CoordinatesType;
}
