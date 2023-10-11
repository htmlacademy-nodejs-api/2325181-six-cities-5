import { injectable, inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import {CommentEntity, CommentService, CreateCommentDTO} from './index.js';
import { Component } from '../../types/component.enum.js';
import { OfferEntity } from '../offer/offer.entity.js';

@injectable()
export class DefaultCommentService implements CommentService {

  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const result = (await this.commentModel.create(dto)).populate('authorId');
    const newRating = await this.calculateAverageRatingByOfferId(dto.offerId);
    this.offerModel
      .findByIdAndUpdate(dto.offerId, {
        '$set': {rating: newRating},
        '$inc': {reviews: 1}
      }, {new: true}).exec();
    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId}).populate('authorId');
  }

  public async calculateAverageRatingByOfferId(offerId: string): Promise<number> {
    const commentList = await this.commentModel.find({offerId});
    const ratingSum = commentList.reduce((accRating, comment) => accRating + comment.rating, 0);
    return Math.round(ratingSum / commentList.length);
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    return (await this.commentModel.deleteMany({offerId}).exec()).deletedCount;
  }
}
