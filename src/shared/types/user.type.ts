import { UserLevelType } from './index.js';

export type UserType = {
  name: string;
  email: string;
  avatarURL: string;
  userType: UserLevelType;
}
