import chalk from 'chalk';
import { TSVFileReader, DatabaseClient, MongoDatabaseClient, Logger, ConsoleLogger, DefaultUserService, UserModel, UserService, OfferService, DefaultOfferService, OfferModel, OfferType, getErrorMessage, createOffer, getMongoURI } from '../../shared/index.js';
import { Command, DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor () {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }


  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line:string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: OfferType) {
    const user = await this.userService.findOrCreate({
      ...offer.host,
      password: DEFAULT_USER_PASSWORD,
      favoritesList: [],
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: offer.city,
      previewImageURL: offer.previewImageURL,
      images: offer.images,
      isPremium: offer.isPremium,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      price: offer.price,
      goods: offer.goods,
      hostId: user.id,
      coordinates: offer.coordinates
    });

  }


  private onCompleteImport(count: number): void {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(`${chalk.italic.bgRedBright('Cannot import data from the file:')} ${chalk.underline.redBright(filename)}`);
      console.error(`${chalk.bold.bgRedBright('Details:')} ${chalk.underline.redBright(getErrorMessage(err))}`);
    }
  }
}
