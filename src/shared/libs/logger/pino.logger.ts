import {pino, Logger as PinoInstance, transport} from 'pino';
import { Logger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../helpers/file-system.js';
import { resolve } from 'node:path';
import { LOG_FILE_PATH } from '../../../const.js';

export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const destination = resolve(modulePath, LOG_FILE_PATH);
    const fileTransport = transport({
      target: 'pino/file',
      options: { destination }
    });

    this.logger = pino({}, fileTransport);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
