import { Request} from 'express';
import { RequestBody, RequestParams } from './index.js';
import { CreateCommentDTO } from '../modules/comment/create-comment.dto.js';

export type CreateCommentRequestType = Request<RequestParams, RequestBody, CreateCommentDTO>;
