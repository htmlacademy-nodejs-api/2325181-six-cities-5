import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError, Middleware, DocumentExists } from '../index.js';

export class DocumentExistsMiddleware implements Middleware {
  constructor (
    private readonly service: DocumentExists,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params, body}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName] || body[this.paramName];
    if (!(await this.service.exists(documentId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
