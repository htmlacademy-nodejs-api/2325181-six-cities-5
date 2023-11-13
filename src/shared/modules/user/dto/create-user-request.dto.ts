import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserLevelType } from '../../../index.js';
import { UserValidationMessage, UserLevel,
  UserValidationParameters } from '../../../../const.js';

export class CreateUserDTO {

  @IsEmail({}, {message: UserValidationMessage.Email.InvalidFormat})
  public email!: string;

  @IsString({message: UserValidationMessage.Name.InvalidFormat})
  @Length(
    UserValidationParameters.Name.Length.Minimum,
    UserValidationParameters.Name.Length.Maximum,
    {message: UserValidationMessage.Name.InvalidLength}
  )
  public name!: string;

  @IsString({message: UserValidationMessage.Password.InvalidFormat})
  @Length(
    UserValidationParameters.Password.Length.Minimum,
    UserValidationParameters.Password.Length.Maximum,
    {message: UserValidationMessage.Password.InvalidLength}
  )
  public password!: string;

  @IsEnum(UserLevel, {message: UserValidationMessage.UserType.InvalidValue})
  public userType!: UserLevelType;

  @IsOptional()
  @IsString({message: UserValidationMessage.AvatarURL.InvalidFormat})
  @Matches(
    UserValidationParameters.AvatarURL.MatchRegex,
    {message: UserValidationMessage.AvatarURL.InvalidExtension}
  )
  public avatarURL?: string;
}
