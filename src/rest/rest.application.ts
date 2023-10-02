import { Logger } from '../shared/libs/logger/logger.interface.js';
import { ApplicationMessages } from '../const.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger
  ) {}

  public async init() {
    this.logger.info(ApplicationMessages.Info);
  }
}
