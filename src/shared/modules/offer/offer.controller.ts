import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { HttpMethod } from '../../../const.js';
import { Request, Response } from 'express';
import { CreateOfferRequestType } from '../../types/create-offer-request.type.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './offer.rdo.js';

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
    // this.addRoute({path: '/{offerId}', method: HttpMethod.Put, handler: this.update});
    // this.addRoute({path: '/{offerId}', method: HttpMethod.Delete, handler: this.delete});
    // this.addRoute({path: '/{offerId}', method: HttpMethod.Get, handler: this.read});
    // this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.indexPremium});
    // this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.indexFavorites});

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find('c.brooks@mymail.com');
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({body}: CreateOfferRequestType, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  // public update(req: Request, res: Response): void {

  // }

  // public delete(req: Request, res: Response): void {

  // }

  // public read(req: Request, res: Response): void {

  // }

  // public indexPremium(req: Request, res: Response): void {

  // }

  // public indexFavorites(req: Request, res: Response): void {

  // }

}
