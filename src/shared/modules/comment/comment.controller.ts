import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { HttpMethod } from '../../../const.js';
import { HttpError } from '../../libs/rest/index.js';
import { CreateCommentRequestType } from '../../types/create-comment-request.type.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from './comment.rdo.js';
import { ParamCommentType } from '../../types/param-comment.type.js';


@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.show});
  }

  public async create({body}: CreateCommentRequestType, res: Response): Promise<void> {
    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offers with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, comment));
  }


  public async show({params}: Request<ParamCommentType>, res: Response): Promise<void> {
    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. OfferId not found in query parameters',
        'CommentController'
      );
    }

    if (!await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offers with id ${offerId} not found.`,
        'CommentController'
      );
    }

    const comments = this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

}
