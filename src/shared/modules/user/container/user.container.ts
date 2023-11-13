import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component, UserService, UserEntity, UserModel, UserController, Controller, DefaultUserService } from '../../../index.js';

export function createUserContainer() {
  const userServiceContainer = new Container();
  userServiceContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userServiceContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userServiceContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();
  return userServiceContainer;
}
