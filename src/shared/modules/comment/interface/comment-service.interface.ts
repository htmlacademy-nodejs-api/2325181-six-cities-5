import { DocumentType } from '@typegoose/typegoose';
import { ReviewStatisticsType, CommentEntity, CreateCommentDTO } from '../../../index.js';

export interface CommentService {
  create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string):Promise<number | null>;
  calculateAverageRatingByOfferId(offerId: string): Promise<ReviewStatisticsType>
}
