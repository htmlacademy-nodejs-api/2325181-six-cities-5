import { ParamsDictionary} from 'express-serve-static-core';

export type ParamUserId = {
  offerId?: string;
  userId?: string;
  status?: boolean;
} | ParamsDictionary;
