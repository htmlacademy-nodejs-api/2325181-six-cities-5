import { ParamsDictionary} from 'express-serve-static-core';

export type ParamCommentType = {
  offerId?: string;
} | ParamsDictionary;
