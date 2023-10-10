import { UserLevelType } from '../../types/user-level.type.js';

export class UpdateUserDTO {
  public avatarURL: string;
  public name: string;
  public userType: UserLevelType;
}
