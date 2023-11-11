import { UserType } from '../../const.js';

export class UserDTO {

  public email!: string;

  public name!: string;

  public userType!: UserType;

  public avatarURL!: string;

}
