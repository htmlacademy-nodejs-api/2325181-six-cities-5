import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { HttpMethod } from '../../../const.js';
import { CreateUserRequestType } from '../../types/create-user-request.type.js';
import { Logger } from '../../libs/logger/index.js';
import { UserService } from './user-service.interface.js';
import { RestSchemaType, Config } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from './user.rdo.js';
import { LoginUserRequestType } from '../../types/login-user-request.type.js';
import { ParamUserId } from '../../types/param-userid.type.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { OfferRdo } from '../offer/offer.rdo.js';

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
    this.addRoute({path: '/signin', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.auth});
    this.addRoute({path: '/logout', method: HttpMethod.Post, handler: this.logout});
    this.addRoute({path: '/:userId/avatar', method: HttpMethod.Post, handler: this.loadAvatar});
    this.addRoute({path: '/:userId/favorites/:offerId/status', method: HttpMethod.Get, handler: this.toggleFavorites});
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

  public async toggleFavorites({params}: Request<ParamUserId>, res: Response): Promise<void> {
    const {offerId, userId, status} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer id not found in query parameters',
        'UserController'
      );
    }

    if (!userId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. User id not found in query parameters',
        'UserController'
      );
    }

    if (!status) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Status not found in query parameters',
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
