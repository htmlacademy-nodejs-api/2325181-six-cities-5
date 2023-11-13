import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component, CommentEntity, CommentModel, DefaultCommentService, CommentService, Controller, CommentController} from '../../../index.js';

export function createCommentContainer () {
  const commentServiceContainer = new Container();
  commentServiceContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentServiceContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentServiceContainer.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();
  return commentServiceContainer;
}
