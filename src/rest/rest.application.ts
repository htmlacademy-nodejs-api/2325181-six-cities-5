import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { ApplicationMessages } from '../const.js';
import { Config, RestSchemaType } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchemaType>
  ) {}

  public async init() {
    this.logger.info(ApplicationMessages.Info);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
