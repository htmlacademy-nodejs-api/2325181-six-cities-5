import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { ApplicationMessages, STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from '../const.js';
import { Config, RestSchemaType } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/parse-token.middleware.js';
import { getFullServerPath } from '../shared/helpers/index.js';


@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchemaType>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  public async init() {
    this.logger.info(ApplicationMessages.Info);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Initialize database...');
    await this._initDb();
    this.logger.info('Database has been initialized');
    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware has been initialized');
    this.logger.info('Init controllers');
    await this._initControllers();
    this.logger.info('Controllers have been initialized');
    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters have been initialized');
    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(`Server launched on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);

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

  private async _initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use(STATIC_UPLOAD_ROUTE, express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(STATIC_FILES_ROUTE, express.static(this.config.get('STATIC_DIRECTORY_PATH')));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async _initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
  }
}
