import { IsEmail, IsString } from 'class-validator';
import { UserValidationMessage } from '../../../const.js';

export class LoginUserDTO {

  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email: string;

  @IsString({message: UserValidationMessage.password.invalidFormat})
  public password: string;
}
