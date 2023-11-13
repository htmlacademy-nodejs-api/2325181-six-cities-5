import 'reflect-metadata';
import { Container } from 'inversify';
import { RestConfig, Config, RestSchemaType, PinoLogger, Logger, DatabaseClient, MongoDatabaseClient, Component, AppExceptionFilter, ExceptionFilter, HttpErrorExceptionFilter, ValidationExceptionFilter, PathTransformer } from '../shared/index.js';
import { RestApplication } from './index.js';

export function createRestApplicationContainer() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchemaType>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();
  return container;
}
