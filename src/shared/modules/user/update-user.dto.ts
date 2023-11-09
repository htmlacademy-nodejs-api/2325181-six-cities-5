import { IsEmail, IsString, Matches, Length, IsEnum, IsOptional, IsArray, IsObject } from 'class-validator';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserValidationMessage, UserLevel } from '../../../const.js';
import { FavoritesListType } from '../../types/favorites-list.type.js';

export class UpdateUserDTO {

  @IsOptional()
  @IsEmail({}, {message: UserValidationMessage.Email.InvalidFormat})
  public email?: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.AvatarURL.InvalidFormat})
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {message: UserValidationMessage.AvatarURL.InvalidExtension})
  public avatarURL?: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.Name.InvalidFormat})
  @Length(1, 15, {message: UserValidationMessage.Name.InvalidLength})
  public name?: string;

  @IsOptional()
  @IsEnum(UserLevel, {message: UserValidationMessage.UserType.InvalidValue})
  public userType?: UserLevelType;

  @IsOptional()
  @IsArray({message: UserValidationMessage.FavoritesList.InvalidValue})
  @IsObject({each: true, message: UserValidationMessage.FavoritesList.InvalidValue})
  public favoritesList?: FavoritesListType;
}
