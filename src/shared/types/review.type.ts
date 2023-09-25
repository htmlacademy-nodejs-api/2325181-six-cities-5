import { UserType } from './user.type.js';

export type Review = {
  comment: string;
  commentDate: Date;
  rating: number,
  user: UserType
}
