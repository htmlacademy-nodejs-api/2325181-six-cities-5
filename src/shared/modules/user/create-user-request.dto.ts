import { Ref } from '@typegoose/typegoose';
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserValidationMessage, UserLevel } from '../../../const.js';
import { UserEntity } from './user.entity.js';

export class CreateUserDTO {

  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email!: string;

  @IsString({message: UserValidationMessage.name.invalidFormat})
  @Length(1, 15, {message: UserValidationMessage.name.invalidLength})
  public name!: string;

  @IsString({message: UserValidationMessage.password.invalidFormat})
  @Length(6, 12, {message: UserValidationMessage.password.invalidLength})
  public password!: string;

  @IsEnum(UserLevel, {message: UserValidationMessage.userType.invalidValue})
  public userType!: UserLevelType;

  @IsOptional()
  @IsString({message: UserValidationMessage.avatarURL.invalidFormat})
  @Matches(/(.png$|.jpg$|.jpeg$)/i, {message: UserValidationMessage.avatarURL.invalidExtension})
  public avatarURL?: Ref<UserEntity>[];
}
