import { Request} from 'express';
import { ParamCommentType, RequestBody } from './index.js';
import { CreateCommentRequestDTO } from '../modules/comment/create-comment-request.dto.js';

export type CreateCommentRequestType = Request<ParamCommentType, RequestBody, CreateCommentRequestDTO>;
