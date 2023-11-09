import { Matches, IsArray, IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserValidationMessage, UserLevel } from '../../../const.js';
import { FavoritesListType } from '../../types/index.js';

export class CreateUserDTO {

  @IsEmail({}, {message: UserValidationMessage.Email.InvalidFormat})
  public email!: string;

  @IsString({message: UserValidationMessage.Name.InvalidFormat})
  @Length(1, 15, {message: UserValidationMessage.Name.InvalidLength})
  public name!: string;

  @IsString({message: UserValidationMessage.Password.InvalidFormat})
  @Length(6, 12, {message: UserValidationMessage.Password.InvalidLength})
  public password!: string;

  @IsEnum(UserLevel, {message: UserValidationMessage.UserType.InvalidValue})
  public userType!: UserLevelType;

  @IsOptional()
  @IsArray({message: UserValidationMessage.FavoritesList.InvalidValue})
  public favoritesList!: FavoritesListType;

  @IsOptional()
  @IsString({message: UserValidationMessage.AvatarURL.InvalidFormat})
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {message: UserValidationMessage.AvatarURL.InvalidExtension})
  public avatarURL!: string;
}
