import 'reflect-metadata';
import { Container } from 'inversify';
import { RestConfig, Config, RestSchemaType } from '../shared/libs/config/index.js';
import { PinoLogger, Logger } from '../shared/libs/logger/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { Component } from '../shared/types/component.enum.js';
import { RestApplication } from './rest.application.js';

export function createRestApplicationContainer() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchemaType>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  return container;
}
