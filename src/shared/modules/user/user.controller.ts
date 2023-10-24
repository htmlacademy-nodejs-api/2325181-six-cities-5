import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { BaseController, HttpError, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Component, CreateUserRequestType, LoginUserRequestType, ParamUserType } from '../../types/index.js';
import { HttpMethod } from '../../../const.js';
import { Logger } from '../../libs/logger/index.js';
import { UserService, UserRdo, CreateUserDTO, LoginUserDTO } from './index.js';
import { RestSchemaType, Config } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferService, OfferRdo } from '../offer/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchemaType>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');
    this.addRoute({
      path: '/signin',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDTO)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDTO)]
    });
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.auth});
    this.addRoute({path: '/logout', method: HttpMethod.Post, handler: this.logout});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.loadAvatar,
      middlewares: [new ValidateObjectIdMiddleware('userId')]
    });
    this.addRoute({
      path: '/:userId/favorites/:offerId/status',
      method: HttpMethod.Get,
      handler: this.toggleFavorites,
      middlewares: [new ValidateObjectIdMiddleware('userId'), new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async create(
    {body}: CreateUserRequestType, res: Response
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email '${body.email}' exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async auth() {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async loadAvatar() {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async toggleFavorites({params}: Request<ParamUserType>, res: Response): Promise<void> {
    const {offerId, userId, status} = params;


    if (!offerId || !userId || !status) {
      const missingKey = Object.entries(params).filter((param) => param[1] === 'undefined')[0];
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Bad request. ${missingKey} not found in query parameters`,
        'UserController'
      );
    }

    const isSetFavorite = !!status;
    await this.userService.addRemoveFavorites(userId, offerId, isSetFavorite);
    const offer = await this.offerService.findById('', offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async login(
    {body}: LoginUserRequestType, _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async logout() {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }
}
