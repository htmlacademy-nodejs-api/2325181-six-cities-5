import { IsEmail, IsString, Matches, Length, IsEnum, IsOptional, IsArray, IsObject } from 'class-validator';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserValidationMessage, UserLevel } from '../../../const.js';
import { FavoritesListType } from '../../types/favorites-list.type.js';

export class UpdateUserDTO {

  @IsOptional()
  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email?: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.avatarURL.invalidFormat})
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {message: UserValidationMessage.avatarURL.invalidExtension})
  public avatarURL?: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.name.invalidFormat})
  @Length(1, 15, {message: UserValidationMessage.name.invalidLength})
  public name?: string;

  @IsOptional()
  @IsEnum(UserLevel, {message: UserValidationMessage.userType.invalidValue})
  public userType?: UserLevelType;

  @IsOptional()
  @IsArray({message: UserValidationMessage.favoritesList.invalidValue})
  @IsObject({each: true, message: UserValidationMessage.favoritesList.invalidValue})
  public favoritesList?: FavoritesListType;
}
