import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from '../../../../const.js';
import { ValuesType, Middleware } from '../../../index.js';

export interface Route {
  path: string;
  method: ValuesType<typeof HttpMethod>;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
