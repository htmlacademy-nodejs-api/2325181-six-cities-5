import { IsArray, IsEmail, IsEnum, IsString, Length, Matches } from 'class-validator';
import { UserLevelType } from '../../types/user-level.type.js';
import { CreateUserValidationMessage, UserLevel } from '../../../const.js';

export class CreateUserDTO {

  @IsEmail({}, {message: CreateUserValidationMessage.email.invalidFormat})
  public email: string;

  @IsString({message: CreateUserValidationMessage.avatarURL.invalidFormat})
  @Matches(/(.png$|.jpg$|^$)/i, {message: CreateUserValidationMessage.avatarURL.invalidExtension})
  public avatarURL: string;

  @IsString({message: CreateUserValidationMessage.name.invalidFormat})
  @Length(1, 15, {message: CreateUserValidationMessage.name.invalidLength})
  public name: string;

  @IsString({message: CreateUserValidationMessage.password.invalidFormat})
  @Length(6, 12, {message: CreateUserValidationMessage.password.invalidLength})
  public password: string;

  @IsEnum(UserLevel, {message: CreateUserValidationMessage.userType.invalideValue})
  public userType: UserLevelType;

  @IsArray({message: CreateUserValidationMessage.favoritesList.invalidValue})
  public favoritesList: string[];
}
