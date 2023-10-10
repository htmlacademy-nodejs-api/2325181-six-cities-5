import { injectable, inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import {CommentEntity, CommentService, CreateCommentDTO} from './index.js';
import { Component } from '../../types/component.enum.js';


@injectable()
export class DefaultCommentService implements CommentService {

  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    return (await this.commentModel.create(dto)).populate('authorId');

  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId}).populate('authorId');
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    return (await this.commentModel.deleteMany({offerId}).exec()).deletedCount;
  }
}
