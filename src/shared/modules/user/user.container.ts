import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { DefaultUserService } from './default-user.service.js';
import { Component } from '../../types/component.enum.js';
import { UserService } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import { Controller } from '../../libs/rest/index.js';
import { UserController } from './user.controller.js';

export function createUserContainer() {
  const userServiceContainer = new Container();
  userServiceContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userServiceContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userServiceContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();
  return userServiceContainer;
}
