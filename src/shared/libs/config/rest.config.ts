import { config } from 'dotenv';
import { Logger } from '../logger/logger.interface.js';
import { Config } from './config.interface.js';
import { RestSchemaType, configRestSchema } from './rest.schema.js';

export class RestConfig implements Config<RestSchemaType> {
  private readonly config: RestSchemaType;

  constructor (
    private readonly logger: Logger
  ) {
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file.');
    }

    configRestSchema.load({});
    configRestSchema.validate({
      allowed: 'strict',
      output: this.logger.info
    });
    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed.');
  }

  public get<T extends keyof RestSchemaType>(key: T): RestSchemaType[T] {
    return this.config[key];
  }
}
