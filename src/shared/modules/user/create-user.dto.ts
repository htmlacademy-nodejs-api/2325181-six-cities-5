import { UserLevelType } from '../../types/user-level.type.js';

export class CreateUserDTO {
  public email: string;
  public avatarURL: string;
  public name: string;
  public password: string;
  public userType: UserLevelType;
  public favoritesList: string[];
}
