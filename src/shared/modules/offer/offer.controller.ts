import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { BaseController, DocumentExistsMiddleware, HttpError, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { CreateOfferRequestType, ParamOfferType, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../../const.js';
import { fillDTO } from '../../helpers/common.js';
import { UpdateOfferDTO, CreateOfferDTO, OfferRdo, OfferService } from './index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDTO)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
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
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.getPremium});
    this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites});

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find('c.brooks@mymail.com');

    if (!offers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offers not found',
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({body}: CreateOfferRequestType, res: Response): Promise<void> {

    if (!body) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer object not found in request body',
        'OfferController'
      );
    }

    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById('c.brooks@mymail.com', result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async update({body, params}: Request<ParamOfferType, unknown, UpdateOfferDTO>, res: Response): Promise<void> {
    const {offerId} = params;
    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer id not found in query parameters',
        'OfferController'
      );
    }

    const updateOffer = await this.offerService.updateById(offerId, body);

    this.ok(res, fillDTO(OfferRdo, updateOffer));
  }

  public async delete({params}: Request<ParamOfferType>, res: Response): Promise<void> {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer id not found in query parameters',
        'OfferController'
      );
    }

    const offer = await this.offerService.deleteById(offerId);

    this.noContent(res, offer);
  }

  public async show({params}: Request<ParamOfferType>, res: Response): Promise<void> {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Offer id not found in query parameters',
        'OfferController'
      );
    }

    const offer = await this.offerService.findById('c.brooks@mymail.com', offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async getPremium({params}: Request<ParamOfferType>, res: Response): Promise<void> {
    const {city} = params;

    if (!city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. City not found in query parameters',
        'OfferController'
      );
    }

    const premiumOffers = await this.offerService.findPremium(city);

    if (!premiumOffers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Premium offers not found',
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, premiumOffers));
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const favoriteOffers = await this.offerService.findFavorites('c.brooks@mymail.com');

    if (!favoriteOffers) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Favorite offers not found',
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, favoriteOffers));
  }

}
