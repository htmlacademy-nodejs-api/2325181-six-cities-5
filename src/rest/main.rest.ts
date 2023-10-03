import { Container } from 'inversify';
import { RestConfig, Config } from '../shared/libs/config/index.js';
import { PinoLogger, Logger } from '../shared/libs/logger/index.js';
import { RestApplication } from './rest.application.js';
import { RestSchemaType } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/types/component.enum.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication);
  container.bind<Logger>(Component.Logger).to(PinoLogger);
  container.bind<Config<RestSchemaType>>(Component.Config).to(RestConfig);
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
