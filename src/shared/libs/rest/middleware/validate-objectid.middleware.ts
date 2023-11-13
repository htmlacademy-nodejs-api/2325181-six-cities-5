import { Response, Request } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { HttpError, Middleware } from '../index.js';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }

}
