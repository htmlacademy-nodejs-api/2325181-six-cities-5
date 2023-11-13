import { Request} from 'express';
import { ParamCommentType, RequestBody, CreateCommentRequestDTO } from '../index.js';

export type CreateCommentRequestType = Request<ParamCommentType, RequestBody, CreateCommentRequestDTO>;
