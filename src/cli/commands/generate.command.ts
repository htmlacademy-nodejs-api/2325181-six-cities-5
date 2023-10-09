import got from 'got';
import chalk from 'chalk';
import { MockServerDataType } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {

  private initialData: MockServerDataType;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Cannot import data from ${url}`);
    }
  }

  private async write(filePath: string, count: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filePath);
    for(let i = 0; i < count; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, URL] = parameters;
    const offersCount = Number.parseInt(count, 10);

    try {
      await this.load(URL);
      await this.write(filePath, offersCount);
      console.info(chalk.greenBright.italic(`File ${filePath} has been successfully created`));
    } catch (err: unknown){
      console.error(chalk.bgRed.bold('Cannot load data'));
      console.error(chalk.red.underline(getErrorMessage(err)));
    }
  }
}
