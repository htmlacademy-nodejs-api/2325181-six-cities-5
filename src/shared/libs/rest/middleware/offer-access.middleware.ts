import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { OfferAccess } from './offer-access.middleware.interface.js';
import { HttpError } from '../index.js';
import { StatusCodes } from 'http-status-codes';

export class OfferAccessMiddleware implements Middleware {
  constructor(
    private readonly service: OfferAccess
  ) {}

  public async execute({params, tokenPayload, favoritesList}: Request, _res: Response, next: NextFunction): Promise<void> {
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
    const offer = await this.service.findById(favoritesList!, offerId);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Not found. The offer did not found in database.',
        'OfferController'
      );
    }
    if (offer.hostId._id.toString() !== tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden. Users may update only their own offers',
        'OfferController'
      );
    }
    next();
  }
}
