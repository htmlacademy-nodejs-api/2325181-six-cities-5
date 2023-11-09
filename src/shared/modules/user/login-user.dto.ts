import { IsEmail, IsString, Length } from 'class-validator';
import { UserValidationMessage } from '../../../const.js';

export class LoginUserDTO {

  @IsEmail({}, {message: UserValidationMessage.Email.InvalidFormat})
  public email!: string;

  @IsString({message: UserValidationMessage.Password.InvalidFormat})
  @Length(6, 12, {message: UserValidationMessage.Password.InvalidLength})
  public password!: string;
}
