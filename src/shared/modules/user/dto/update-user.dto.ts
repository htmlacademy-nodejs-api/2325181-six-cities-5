import { IsEmail, IsString, Matches, Length, IsEnum, IsOptional, IsArray, IsObject } from 'class-validator';
import { UserValidationMessage, UserLevel, UserValidationParameters } from '../../../../const.js';
import { FavoritesListType, UserLevelType } from '../../../index.js';

export class UpdateUserDTO {

  @IsOptional()
  @IsEmail({}, {message: UserValidationMessage.Email.InvalidFormat})
  public email?: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.AvatarURL.InvalidFormat})
  @Matches(
    UserValidationParameters.AvatarURL.MatchRegex,
    {message: UserValidationMessage.AvatarURL.InvalidExtension}
  )
  public avatarURL?: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.Name.InvalidFormat})
  @Length(
    UserValidationParameters.Name.Length.Minimum,
    UserValidationParameters.Name.Length.Maximum,
    {message: UserValidationMessage.Name.InvalidLength}
  )
  public name?: string;

  @IsOptional()
  @IsEnum(UserLevel, {message: UserValidationMessage.UserType.InvalidValue})
  public userType?: UserLevelType;

  @IsOptional()
  @IsArray({message: UserValidationMessage.FavoritesList.InvalidValue})
  @IsObject({each: true, message: UserValidationMessage.FavoritesList.InvalidValue})
  public favoritesList?: FavoritesListType;
}
