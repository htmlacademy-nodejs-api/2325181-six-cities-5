import { Request} from 'express';
import { RequestBody, RequestParams, CreateUserDTO} from '../index.js';

export type CreateUserRequestType = Request<RequestParams, RequestBody, CreateUserDTO>;
