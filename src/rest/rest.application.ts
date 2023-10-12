import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { ApplicationMessages } from '../const.js';
import { Config, RestSchemaType } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';


@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchemaType>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {
    this.server = express();
  }

  public async init() {
    this.logger.info(ApplicationMessages.Info);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Initialize database...');
    await this._initDb();
    this.logger.info('Database has been initialized');
    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(`Server launched on http://localhost:${this.config.get('PORT')}`);

    this.server.get('/', (_req, res) => {
      res.send('Hello world');
    });
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initDb () {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    return this.databaseClient.connect(mongoUri);
  }
}
