import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpError, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Component, CreateUserRequestType, LoginUserRequestType, ParamUserType } from '../../types/index.js';
import { DEFAULT_AVATAR_FILE_NAME, HttpMethod } from '../../../const.js';
import { Logger } from '../../libs/logger/index.js';
import { UserService, UserRdo, CreateUserDTO, LoginUserDTO } from './index.js';
import { RestSchemaType, Config } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferService, OfferRdo } from '../offer/index.js';
import { UploadFileMiddleware, PrivateRouteMiddleware, FavoritesListMiddleware } from '../../libs/rest/index.js';
import { AuthService } from '../auth/auth-service.interface.js';
import { LoggedUserRdo } from './logged-user.rdo.js';
import { modifyFavoriteList } from '../../helpers/favorite-list.js';
import { UploadUserAvatarRdo } from './upload-avatar.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchemaType>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Get,
      handler: this.toggleFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new FavoritesListMiddleware(this.userService)
      ]
    });
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
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.auth,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/avatar',
      method: HttpMethod.Post,
      handler: this.loadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
  }

  public async create(
    {body, tokenPayload}: CreateUserRequestType, res: Response
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email '${body.email}' exists.`,
        'UserController'
      );
    }

    if (tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Only unauthorized users may create new user accounts.',
        'UserController'
      );
    }

    const avatarFileName = body.avatarURL || DEFAULT_AVATAR_FILE_NAME;
    const result = await this.userService.create({...body, favoritesList: [], avatarURL: avatarFileName}, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async auth({tokenPayload}: Request, res: Response) {

    const currentUserEmail = tokenPayload!.email || null;

    const foundedUser = await this.userService.findByEmail(currentUserEmail);
    console.log(foundedUser);
    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, foundedUser));
  }

  public async loadAvatar({file, tokenPayload}: Request, res: Response) {
    const userId = tokenPayload?.id;
    const uploadFile = {avatarURL: file?.filename};
    await this.userService.updateById(userId!, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, {filepath: uploadFile.avatarURL}));
  }

  public async toggleFavorites({params, tokenPayload, favoritesList}: Request<ParamUserType>, res: Response): Promise<void> {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Bad request. Offer id ${offerId} not found in query parameters`,
        'UserController'
      );
    }
    favoritesList = modifyFavoriteList(favoritesList!, offerId);
    await this.userService.updateById(tokenPayload!.id, {favoritesList});
    const offer = await this.offerService.findById(favoritesList!, offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async login(
    {body}: LoginUserRequestType, res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, {token}));
  }
}
