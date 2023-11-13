import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { reduceValidationErrors, ValidationError, Middleware } from '../../../index.js';

export class ValidateDtoMiddleware implements Middleware {
  constructor (private dto: ClassConstructor<object>) {}

  public async execute({body, path}: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error: ${path}`, reduceValidationErrors(errors));
    }
    next();
  }
}
