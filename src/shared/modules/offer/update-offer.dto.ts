import { IsOptional, Length, IsDateString, IsBoolean, IsEnum, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, IsNumber, IsMongoId } from 'class-validator';
import { LocationType, LodgingType, GoodsType } from '../../types/index.js';
import { OfferValidationMessage, Location, LodgingKind, Goods } from '../../../const.js';

export class UpdateOfferDTO {

  @IsOptional()
  @Length(10, 100, {message: OfferValidationMessage.title.invalidLength})
  public title?: string;

  @IsOptional()
  @Length(20, 1024, {message: OfferValidationMessage.title.invalidLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: OfferValidationMessage.offerDate.invalidFormat})
  public offerDate?: Date;

  @IsOptional()
  @IsEnum({Location, message: OfferValidationMessage.city.invalidValue})
  public city?: LocationType;

  @IsOptional()
  public previewImageURL?: string;

  @IsOptional()
  @ArrayMinSize(6, {message: OfferValidationMessage.images.invalidCount})
  @ArrayMaxSize(6, {message: OfferValidationMessage.images.invalidCount})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @Min(1, {message: OfferValidationMessage.rating.invalidValue})
  @Max(5, {message: OfferValidationMessage.rating.invalidValue})
  public rating?: number;

  @IsOptional()
  @IsEnum({LodgingKind, message: OfferValidationMessage.type.invalidValue})
  public type?: LodgingType;

  @IsOptional()
  @Min(1, {message: OfferValidationMessage.bedrooms.invalidValue})
  @Max(8, {message: OfferValidationMessage.bedrooms.invalidValue})
  public bedrooms?: number;

  @IsOptional()
  @Min(1, {message: OfferValidationMessage.maxAdults.invalidValue})
  @Max(10, {message: OfferValidationMessage.maxAdults.invalidValue})
  public maxAdults?: number;

  @IsOptional()
  @Min(100, {message: OfferValidationMessage.price.invalidValue})
  @Max(100000, {message: OfferValidationMessage.price.invalidValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.goods.invalidValue})
  @IsEnum(Goods, {each: true, message: OfferValidationMessage.goods.invalidValue})
  public goods?: GoodsType;

  @IsOptional()
  @IsMongoId({message: OfferValidationMessage.hostId.invalidValue})
  public hostId?: string;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.coordinates.invalidValue})
  @IsNumber({}, {each: true, message: OfferValidationMessage.coordinates.invalidValue})
  public coordinates?: number[];
}
