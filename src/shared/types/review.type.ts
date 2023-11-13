import { UserType } from './index.js';

export type ReviewType = {
  comment: string;
  commentDate: Date;
  rating: number,
  user: UserType
}
