import { Container } from 'inversify';
import { DefaultUserService } from './default-user.service.js';
import { Component } from '../../types/component.enum.js';
import { UserService } from './user-service.interface.js';

export function createUserContainer() {
  const userServiceContainer = new Container();
  userServiceContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  return userServiceContainer;
}
