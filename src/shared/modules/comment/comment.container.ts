import { Container } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { CommentEntity, CommentModel, DefaultCommentService } from './index.js';
import { types } from '@typegoose/typegoose';

export function createCommentContainer () {
  const commentServiceContainer = new Container();
  commentServiceContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentServiceContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  return commentServiceContainer;
}
