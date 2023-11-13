import { Matches, IsOptional, Length, IsBoolean, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, IsNumber, IsMongoId, IsString, IsInt, ArrayUnique, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationType, LodgingType, GoodsType, Coordinates} from '../../../index.js';
import { OfferValidationMessage, Location, LodgingKind, Goods,
  OfferValidationParameters } from '../../../../const.js';


export class UpdateOfferDTO {

  @IsOptional()
  @Length(
    OfferValidationParameters.Title.Length.Minimum,
    OfferValidationParameters.Title.Length.Maximum,
    {message: OfferValidationMessage.Title.InvalidLength}
  )
  public title?: string;

  @IsOptional()
  @Length(
    OfferValidationParameters.Description.Length.Minimum,
    OfferValidationParameters.Description.Length.Maximum,
    {message: OfferValidationMessage.Title.InvalidLength}
  )
  public description?: string;

  @IsOptional()
  @IsEnum(Location, {message: OfferValidationMessage.City.InvalidValue})
  public city?: LocationType;

  @IsOptional()
  @IsString()
  @Matches(
    OfferValidationParameters.PreviewImageURL.MatchRegex,
    {each: true, message: OfferValidationMessage.PreviewImageURL.InvalidFormat}
  )
  public previewImageURL?: string;

  @IsOptional()
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
  public images?: string[];

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({message: OfferValidationMessage.IsPremium.InvalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(LodgingKind, {message: OfferValidationMessage.Type.InvalidValue})
  public type?: LodgingType;

  @IsOptional()
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
  public bedrooms?: number;

  @IsOptional()
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
  public maxAdults?: number;

  @IsOptional()
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
  public price?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.Goods.InvalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.Goods.InvalidValue})
  @ArrayMinSize(
    OfferValidationParameters.Goods.ListLength.Minimum,
    {message: OfferValidationMessage.Goods.EmptyArray}
  )
  @ArrayUnique({message: OfferValidationMessage.Goods.UniqueValues})
  public goods?: GoodsType;

  @IsOptional()
  @IsMongoId({message: OfferValidationMessage.HostId.InvalidValue})
  public hostId?: string;

  @IsOptional()
  @IsObject({message: OfferValidationMessage.Coordinates.InvalidValue})
  @ValidateNested({message: OfferValidationMessage.Coordinates.InvalidValue})
  @Type(() => Coordinates)
  public coordinates?: Coordinates;
}
