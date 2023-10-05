import { UserLevelType } from './user-level.type.js';

export type UserType = {
  name: string;
  email: string;
  avatarURL: string;
  userType: UserLevelType;
}
