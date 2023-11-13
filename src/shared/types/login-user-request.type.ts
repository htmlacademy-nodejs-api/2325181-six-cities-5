import { Request} from 'express';
import { LoginUserDTO, RequestBody, RequestParams } from '../index.js';

export type LoginUserRequestType = Request<RequestParams, RequestBody, LoginUserDTO>;
