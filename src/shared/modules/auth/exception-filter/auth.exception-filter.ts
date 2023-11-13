import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { ExceptionFilter, Component, Logger, BaseAuthException } from '../../../index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor (
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseAuthException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        error: error.message,
        type: 'AUTHORIZATION',
      });
  }
}
