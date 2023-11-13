import { Container } from 'inversify';
import { Component, DefaultAuthService, ExceptionFilter, AuthExceptionFilter, AuthService } from '../../../index.js';

export function createAuthContainer () {
  const authContainer = new Container();
  authContainer.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
