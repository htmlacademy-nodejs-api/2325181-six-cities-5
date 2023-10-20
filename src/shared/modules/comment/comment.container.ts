import { Container } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { CommentEntity, CommentModel, DefaultCommentService } from './index.js';
import { types } from '@typegoose/typegoose';
import { Controller } from '../../libs/rest/index.js';
import CommentController from './comment.controller.js';

export function createCommentContainer () {
  const commentServiceContainer = new Container();
  commentServiceContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentServiceContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentServiceContainer.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();
  return commentServiceContainer;
}
