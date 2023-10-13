import {Response, NextFunction} from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { HttpMethod } from '../../../const.js';
import { CreateUserRequest } from '../../types/create-user-request.type.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');
    this.addRoute({path: '/signin', method: HttpMethod.Post, handler: this.create});
  }

  public async create(
    _req: CreateUserRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      throw new Error('[UserController] failed');
    } catch (err) {
      return next(err);

    }

  }
}
