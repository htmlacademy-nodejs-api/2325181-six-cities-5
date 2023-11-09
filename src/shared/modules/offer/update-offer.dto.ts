import { Matches, IsOptional, Length, IsBoolean, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, IsNumber, IsMongoId, IsString, IsInt, ArrayUnique, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationType, LodgingType, GoodsType} from '../../types/index.js';
import { OfferValidationMessage, Location, LodgingKind, Goods } from '../../../const.js';
import { Coordinates } from './create-offer.dto.js';


export class UpdateOfferDTO {

  @IsOptional()
  @Length(10, 100, {message: OfferValidationMessage.Title.InvalidLength})
  public title?: string;

  @IsOptional()
  @Length(20, 1024, {message: OfferValidationMessage.Title.InvalidLength})
  public description?: string;

  @IsOptional()
  @IsEnum(Location, {message: OfferValidationMessage.City.InvalidValue})
  public city?: LocationType;

  @IsOptional()
  @IsString()
  @Matches(/(.Png$|.jpg$|.jpeg$)/i, {each: true, message: OfferValidationMessage.PreviewImageURL.InvalidFormat})
  public previewImageURL?: string;

  @IsOptional()
  @ArrayMinSize(6, {message: OfferValidationMessage.Images.InvalidCount})
  @ArrayMaxSize(6, {message: OfferValidationMessage.Images.InvalidCount})
  @Matches(/(.Png$|.jpg$|.jpeg$)/i, {each: true, message: OfferValidationMessage.Images.InvalidFormat})
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
  @Min(1, {message: OfferValidationMessage.Bedrooms.InvalidValue})
  @Max(8, {message: OfferValidationMessage.Bedrooms.InvalidValue})
  @IsInt({message: OfferValidationMessage.Bedrooms.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.Bedrooms.InvalidFormat})
  public bedrooms?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.MaxAdults.InvalidValue})
  @Max(10, {message: OfferValidationMessage.MaxAdults.InvalidValue})
  @IsInt({message: OfferValidationMessage.MaxAdults.InvalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.MaxAdults.InvalidFormat})
  public maxAdults?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(100, {message: OfferValidationMessage.Price.InvalidValue})
  @Max(100000, {message: OfferValidationMessage.Price.InvalidValue})
  @IsInt({message: OfferValidationMessage.Price.InvalidFormat})
  public price?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.Goods.InvalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.Goods.InvalidValue})
  @ArrayMinSize(1, {message: OfferValidationMessage.Goods.EmptyArray})
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
