import { UserLevel } from './user-level.type.js';

export type UserType = {
  name: string;
  email:  string;
  avatarURL:  string;
  password: string;
  userType: UserLevel[keyof UserLevel];
}
