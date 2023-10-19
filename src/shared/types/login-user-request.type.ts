import { Request} from 'express';
import { RequestBody, RequestParams } from './index.js';
import { LoginUserDTO } from '../modules/user/index.js';

export type LoginUserRequestType = Request<RequestParams, RequestBody, LoginUserDTO>;
