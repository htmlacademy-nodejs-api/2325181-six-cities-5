import { UserLevelType } from '../../../types/user-level.type.js';

export class createUserDTO {
  public email: string;
  public avatarURL: string;
  public name: string;
  public password: string;
  public userType: UserLevelType;
}
