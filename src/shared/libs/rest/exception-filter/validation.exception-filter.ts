import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { createErrorObject, ValidationError, Component, ExceptionFilter, Logger } from '../../../index.js';
import { ApplicationError } from '../../../../const.js';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }
    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] ${errorField.messages}`)
    );

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
