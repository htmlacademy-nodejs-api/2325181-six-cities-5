import { Matches, IsOptional, Length, IsBoolean, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, IsNumber, IsMongoId, IsString, IsInt, ArrayUnique, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationType, LodgingType, GoodsType} from '../../types/index.js';
import { OfferValidationMessage, Location, LodgingKind, Goods } from '../../../const.js';
import { Coordinates } from './create-offer.dto.js';


export class UpdateOfferDTO {

  @IsOptional()
  @Length(10, 100, {message: OfferValidationMessage.title.invalidLength})
  public title?: string;

  @IsOptional()
  @Length(20, 1024, {message: OfferValidationMessage.title.invalidLength})
  public description?: string;

  @IsOptional()
  @IsEnum(Location, {message: OfferValidationMessage.city.invalidValue})
  public city?: LocationType;

  @IsOptional()
  @IsString()
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {each: true, message: OfferValidationMessage.previewImageURL.invalidFormat})
  public previewImageURL?: string;

  @IsOptional()
  @ArrayMinSize(6, {message: OfferValidationMessage.images.invalidCount})
  @ArrayMaxSize(6, {message: OfferValidationMessage.images.invalidCount})
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {each: true, message: OfferValidationMessage.images.invalidFormat})
  public images?: string[];

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(LodgingKind, {message: OfferValidationMessage.type.invalidValue})
  public type?: LodgingType;

  @IsOptional()
  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.bedrooms.invalidValue})
  @Max(8, {message: OfferValidationMessage.bedrooms.invalidValue})
  @IsInt({message: OfferValidationMessage.bedrooms.invalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.bedrooms.invalidFormat})
  public bedrooms?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1, {message: OfferValidationMessage.maxAdults.invalidValue})
  @Max(10, {message: OfferValidationMessage.maxAdults.invalidValue})
  @IsInt({message: OfferValidationMessage.maxAdults.invalidFormat})
  @IsNumber({}, {message: OfferValidationMessage.maxAdults.invalidFormat})
  public maxAdults?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(100, {message: OfferValidationMessage.price.invalidValue})
  @Max(100000, {message: OfferValidationMessage.price.invalidValue})
  @IsInt({message: OfferValidationMessage.price.invalidFormat})
  public price?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.goods.invalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.goods.invalidValue})
  @ArrayMinSize(1, {message: OfferValidationMessage.goods.emptyArray})
  @ArrayUnique({message: OfferValidationMessage.goods.uniqueValues})
  public goods?: GoodsType;

  @IsOptional()
  @IsMongoId({message: OfferValidationMessage.hostId.invalidValue})
  public hostId?: string;

  @IsOptional()
  @IsObject({message: OfferValidationMessage.coordinates.invalidValue})
  @ValidateNested({message: OfferValidationMessage.coordinates.invalidValue})
  @Type(() => Coordinates)
  public coordinates?: Coordinates;
}
