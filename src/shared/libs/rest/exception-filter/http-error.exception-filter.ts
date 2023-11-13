import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { createErrorObject, Logger, Component, ExceptionFilter, HttpError } from '../../../index.js';
import { ApplicationError } from '../../../../const.js';

@injectable()
export class HttpErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res.status(error.httpStatusCode).json(createErrorObject(ApplicationError.HttpError, error.message));
  }
}
