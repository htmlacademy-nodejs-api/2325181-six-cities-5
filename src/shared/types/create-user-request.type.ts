import { Request} from 'express';
import { RequestBody, RequestParams } from './index.js';
import { CreateUserDTO } from '../modules/user/create-user.dto.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDTO>;
