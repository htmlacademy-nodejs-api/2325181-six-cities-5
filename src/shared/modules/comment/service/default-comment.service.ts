import { injectable, inject } from 'inversify';
import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import { ReviewStatisticsType, OfferEntity, Component, CommentEntity, CommentService, CreateCommentDTO } from '../../../index.js';
import { COMMENT_COUNT, SortOrder } from '../../../../const.js';

@injectable()
export class DefaultCommentService implements CommentService {

  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const result = (await this.commentModel.create(dto)).populate('authorId');
    const {rating} = await this.calculateAverageRatingByOfferId(dto.offerId);
    await this.offerModel
      .findByIdAndUpdate(dto.offerId, {
        '$set': {rating}
      }, {new: true}).exec();
    return result;
  }

  public async calculateAverageRatingByOfferId(offerId: string): Promise<ReviewStatisticsType> {
    const objectOffer = new mongoose.Types.ObjectId(offerId);
    const averageRatingList: ReviewStatisticsType[] = await this.commentModel.aggregate([
      {$match: { offerId: objectOffer}},
      {$group: {
        _id: '$offerId',
        averageRating: {$avg: '$rating'},
      }},
      {$project: {
        rating: {$round: ['$averageRating', 1]},
      }},
      {$unset: '_id'}
    ]);
    return averageRatingList[0];
  }

  public async findByOfferId(offerId: string,): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId}).limit(COMMENT_COUNT).sort({ commentDate: SortOrder.Desc }).populate('authorId').exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    return (await this.commentModel.deleteMany({offerId}).exec()).deletedCount;
  }
}
