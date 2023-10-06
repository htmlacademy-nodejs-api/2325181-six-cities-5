import { UserType } from './user.type.js';

export type ReviewType = {
  comment: string;
  commentDate: Date;
  rating: number,
  user: UserType
}
