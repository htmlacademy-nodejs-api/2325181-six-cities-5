import { Ref } from '@typegoose/typegoose';
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserValidationMessage, UserLevel } from '../../../const.js';
import { UserEntity } from './user.entity.js';

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
  @IsString({message: UserValidationMessage.AvatarURL.InvalidFormat})
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {message: UserValidationMessage.AvatarURL.InvalidExtension})
  public avatarURL?: Ref<UserEntity>[];
}
