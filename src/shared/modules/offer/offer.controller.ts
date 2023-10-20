import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../../const.js';
import { Request, Response } from 'express';
import { CreateOfferRequestType } from '../../types/create-offer-request.type.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './offer.rdo.js';
import { ParamOfferType } from '../../types/param-offer.type.js';
import { UpdateOfferDTO } from './update-offer.dto.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.indexPremium});
    this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.indexFavorites});

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

    if (!updateOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'OfferController'
      );
    }

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


    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'OfferController'
      );

    }

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

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async indexPremium({params}: Request<ParamOfferType>, res: Response): Promise<void> {
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

  public async indexFavorites(_req: Request, res: Response): Promise<void> {
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
