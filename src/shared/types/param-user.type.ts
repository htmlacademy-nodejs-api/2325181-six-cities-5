import { ParamsDictionary} from 'express-serve-static-core';

export type ParamUserType = {
  offerId?: string;
  userId?: string;
  status?: boolean;
} | ParamsDictionary;
