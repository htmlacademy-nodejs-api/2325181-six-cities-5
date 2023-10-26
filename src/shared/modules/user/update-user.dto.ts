import { IsString, Matches, Length, IsEnum, IsOptional, IsMimeType } from 'class-validator';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserValidationMessage, UserLevel } from '../../../const.js';

export class UpdateUserDTO {

  @IsOptional()
  @IsString({message: UserValidationMessage.avatarURL.invalidFormat})
  @Matches(/(.png$|.jpg$|^$)/i, {message: UserValidationMessage.avatarURL.invalidExtension})
  @IsMimeType({message: UserValidationMessage.avatarURL.invalidExtension})
  public avatarURL?: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.name.invalidFormat})
  @Length(1, 15, {message: UserValidationMessage.name.invalidLength})
  public name?: string;

  @IsOptional()
  @IsEnum(UserLevel, {message: UserValidationMessage.userType.invalideValue})
  public userType?: UserLevelType;
}
