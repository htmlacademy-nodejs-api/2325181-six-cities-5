import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { BaseController, DocumentExistsMiddleware, FavoritesListMiddleware, HttpError, PrivateRouteMiddleware, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { CreateOfferRequestType, ParamOfferType, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../../const.js';
import { fillDTO } from '../../helpers/common.js';
import { UpdateOfferDTO, OfferRdo, OfferService, CreateOfferRequestDTO } from './index.js';
import { OfferAccessMiddleware } from '../../libs/rest/middleware/offer-access.middleware.js';
import { UserService } from '../user/user-service.interface.js';
import { RestSchemaType, Config } from '../../libs/config/index.js';
import { UploadImageRdo } from './upload-image.rdo.js';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchemaType>,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new FavoritesListMiddleware(this.userService)
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferRequestDTO),
        new FavoritesListMiddleware(this.userService)
      ]
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremium,
      middlewares: [
        new FavoritesListMiddleware(this.userService)
      ]
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new FavoritesListMiddleware(this.userService)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new FavoritesListMiddleware(this.userService),
        new OfferAccessMiddleware(this.offerService),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware,
        new FavoritesListMiddleware(this.userService),
        new OfferAccessMiddleware(this.offerService),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new FavoritesListMiddleware(this.userService)
      ]
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new FavoritesListMiddleware(this.userService),
        new ValidateObjectIdMiddleware('offerId'),
        new OfferAccessMiddleware(this.offerService),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image')
      ]
    });

  }

  public async uploadImage({params, file}: Request<ParamOfferType>, res: Response) {
    const {offerId} = params;
    const updateDto = {previewImageURL: file?.filename};
    await this.offerService.updateById(offerId!, updateDto);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }

  public async index({favoritesList}: Request, res: Response): Promise<void> {

    const offers = await this.offerService.find(favoritesList!);

    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offers not found',
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getFavorites({favoritesList}: Request, res: Response): Promise<void> {
    const favoriteOffers = await this.offerService.findFavorites(favoritesList!);

    if (!favoriteOffers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Favorite offers not found',
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, favoriteOffers));
  }

  public async show({params, favoritesList}: Request<ParamOfferType>, res: Response): Promise<void> {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer id not found in query parameters',
        'OfferController'
      );
    }

    const offer = await this.offerService.findById(favoritesList!, offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create({body, favoritesList, tokenPayload}: CreateOfferRequestType, res: Response): Promise<void> {

    if (!body) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer object not found in request body',
        'OfferController'
      );
    }

    if (!tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorised user. Only authorized users may create new offers.',
        'CommentController'
      );
    }
    const result = await this.offerService.create({...body, hostId: tokenPayload.id});
    const offer = await this.offerService.findById(favoritesList!, result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async update({body, params: {offerId}}: Request<ParamOfferType, unknown, UpdateOfferDTO>, res: Response): Promise<void> {

    if (offerId) {
      const updateOffer = await this.offerService.updateById(offerId, body);
      this.ok(res, fillDTO(OfferRdo, updateOffer));
    }

  }

  public async delete({params, tokenPayload, favoritesList}: Request<ParamOfferType>, res: Response): Promise<void> {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer id not found in query parameters',
        'OfferController'
      );
    }

    if (!tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorised user. Only authorized users may update offers.',
        'OfferController'
      );
    }

    const offer = await this.offerService.deleteById(offerId);
    const isOfferInFavorites = Boolean(favoritesList!.filter((favorites) => favorites._id.toString() === offerId).length);
    if (isOfferInFavorites) {
      favoritesList = favoritesList!.filter((favorites) => favorites._id.toString() !== offerId);
      await this.userService.updateById(tokenPayload!.id, {favoritesList});
    }

    this.noContent(res, offer);
  }

  public async getPremium({params, favoritesList}: Request<ParamOfferType>, res: Response): Promise<void> {
    const {city} = params;

    if (!city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. City not found in query parameters',
        'OfferController'
      );
    }

    const premiumOffers = await this.offerService.findPremium(favoritesList!, city);

    if (!premiumOffers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Premium offers not found',
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

}
