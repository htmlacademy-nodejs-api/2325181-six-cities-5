import { injectable, inject } from 'inversify';
import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import {CommentEntity, CommentService, CreateCommentDTO} from './index.js';
import { Component } from '../../types/component.enum.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { ReviewStatisticsType } from '../../types/review-statistics.type.js';

@injectable()
export class DefaultCommentService implements CommentService {

  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const result = (await this.commentModel.create(dto)).populate('authorId');
    const {rating, reviews} = await this.calculateAverageRatingByOfferId(dto.offerId);
    this.offerModel
      .findByIdAndUpdate(dto.offerId, {
        '$set': {rating, reviews}
      }, {new: true}).exec();
    return result;
  }

  public async calculateAverageRatingByOfferId(offerId: string): Promise<ReviewStatisticsType> {
    const objectOffer = new mongoose.Types.ObjectId(offerId);
    const averageRatingReviewsCountList: ReviewStatisticsType[] = await this.commentModel.aggregate([
      {$match: { offerId: objectOffer}},
      {$group: {
        _id: '$offerId',
        averageRating: {$avg: '$rating'},
        reviewsCount: {$sum: 1}
      }},
      {$project: {
        rating: {$round: ['$averageRating', 1]},
        reviews: '$reviewsCount'
      }},
      {$unset: '_id'}
    ]);
    return averageRatingReviewsCountList[0];
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId}).populate('authorId');
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    return (await this.commentModel.deleteMany({offerId}).exec()).deletedCount;
  }
}
