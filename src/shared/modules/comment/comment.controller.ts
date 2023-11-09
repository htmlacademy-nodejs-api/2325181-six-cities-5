import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { BaseController, ValidateDtoMiddleware, HttpError, ValidateObjectIdMiddleware, DocumentExistsMiddleware, PrivateRouteMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { OfferService } from '../offer/index.js';
import { HttpMethod } from '../../../const.js';
import { CreateCommentRequestType, ParamCommentType, Component } from '../../types/index.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo, CommentService, CreateCommentRequestDTO } from './index.js';


@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(CreateCommentRequestDTO)
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
  }

  public async create({body, tokenPayload, params}: CreateCommentRequestType, res: Response): Promise<void> {
    if (!body) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. Comment object not found in request body.',
        'CommentController'
      );
    }

    const {offerId} = params;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request. OfferId not found in query parameters',
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...body, authorId: tokenPayload!.id, offerId});
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

    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

}
