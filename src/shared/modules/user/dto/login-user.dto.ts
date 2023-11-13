import { IsEmail, IsString, Length } from 'class-validator';
import { UserValidationMessage, UserValidationParameters } from '../../../../const.js';

export class LoginUserDTO {

  @IsEmail({}, {message: UserValidationMessage.Email.InvalidFormat})
  public email!: string;

  @IsString({message: UserValidationMessage.Password.InvalidFormat})
  @Length(
    UserValidationParameters.Password.Length.Minimum,
    UserValidationParameters.Password.Length.Maximum,
    {message: UserValidationMessage.Password.InvalidLength}
  )
  public password!: string;
}
