import * as Mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private isConnected: boolean;
  private mongoose: typeof Mongoose;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public getConnectionStatus() {
    return this.isConnected;
  }

  private checkConnectionStatus(status: boolean): void {
    if (status !== this.isConnected) {
      throw new Error(
        this.isConnected ?
          'MongoDB client already connected to the database' :
          'Not connected to the database'
      );
    }
  }

  private changeConnectionStatus() {
    this.isConnected = !this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    this.checkConnectionStatus(false);
    this.logger.info('Trying to connect to MongoDB...');
    this.mongoose = await Mongoose.connect(uri);
    this.changeConnectionStatus();
    this.logger.info('Database connection established');
  }

  public async disconnect(): Promise<void> {
    this.checkConnectionStatus(true);
    this.logger.info('Disconnecting from the database...');
    await this.mongoose.disconnect?.();
    this.changeConnectionStatus();
    this.logger.info('Database connection closed');
  }
}
