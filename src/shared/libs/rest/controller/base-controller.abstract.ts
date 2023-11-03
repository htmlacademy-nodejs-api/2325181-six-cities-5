import asyncHandler from 'express-async-handler';
import { injectable, inject } from 'inversify';
import { Router, Response } from 'express';
import { Logger } from '../../logger/index.js';
import { Controller } from './controller.interface.js';
import { Route } from '../route/route.interface.js';
import { DEFAULT_CONTENT_TYPE } from '../../../../const.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../../types/component.enum.js';
import { PathTransformer } from '../transform/path-transformer.js';
import { StaticDataType } from '../../../types/static-data.type.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected readonly logger: Logger,
    @inject(Component.PathTransformer) private pathTransformer: PathTransformer
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ?
      [...middlewareHandlers, wrapperAsyncHandler] :
      wrapperAsyncHandler;
    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTransformer.execute(data as StaticDataType);
    res.type(DEFAULT_CONTENT_TYPE).status(statusCode).json(modifiedData);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

}
