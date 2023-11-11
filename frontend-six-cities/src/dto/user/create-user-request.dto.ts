import { UserType } from '../../const.js';

export class CreateUserDTO {

  public email!: string;

  public name!: string;

  public password!: string;

  public userType!: UserType;

  public avatarURL?: string;
}
