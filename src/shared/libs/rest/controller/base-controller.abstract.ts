import asyncHandler from 'express-async-handler';
import { injectable, inject } from 'inversify';
import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DEFAULT_CONTENT_TYPE } from '../../../../const.js';
import { StaticDataType, Component, Route, Controller, Logger } from '../../../index.js';
import { PathTransformer } from '../transform/path-transformer.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;
  @inject(Component.PathTransformer) private pathTransformer: PathTransformer;

  constructor(
    protected readonly logger: Logger,
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
