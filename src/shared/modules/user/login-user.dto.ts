import { IsEmail, IsString, Length } from 'class-validator';
import { UserValidationMessage } from '../../../const.js';

export class LoginUserDTO {

  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email!: string;

  @IsString({message: UserValidationMessage.password.invalidFormat})
  @Length(6, 12, {message: UserValidationMessage.password.invalidLength})
  public password!: string;
}
