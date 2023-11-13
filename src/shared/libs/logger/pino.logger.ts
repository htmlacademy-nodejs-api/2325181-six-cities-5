import {pino, Logger as PinoInstance, transport} from 'pino';
import { injectable } from 'inversify';
import { resolve } from 'node:path';
import { LOG_FILE_PATH, LogTransportLevels } from '../../../const.js';
import { getTransportOptions, TransportOptionsType, getCurrentModuleDirectoryPath, Logger } from '../../index.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;
  private transportOptions: TransportOptionsType[] = [];

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const destination = resolve(modulePath, LOG_FILE_PATH);
    let option: keyof typeof LogTransportLevels;
    for (option in LogTransportLevels) {
      const transportLevel = LogTransportLevels[option];
      const optionArgs = transportLevel === LogTransportLevels.Debug ?
        getTransportOptions(LogTransportLevels[option], destination) :
        getTransportOptions(LogTransportLevels[option]);
      this.transportOptions.push(optionArgs);
    }
    const multiTransport = transport({
      targets: [...this.transportOptions]
    });
    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created...');
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
