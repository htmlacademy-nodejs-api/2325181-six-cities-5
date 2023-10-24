import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDTO } from './create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { ReviewStatisticsType } from '../../types/review-statistics.type.js';

export interface CommentService {
  create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string):Promise<number | null>;
  calculateAverageRatingByOfferId(offerId: string): Promise<ReviewStatisticsType>
}
