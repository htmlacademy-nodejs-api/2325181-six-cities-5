import got from 'got';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/types/libs/file-reader/offer-generator/tsv-offer-generator.js';
import { appendFile } from 'node:fs/promises';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class GenerateCommand implements Command {

  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Cannot import data from ${url}`);
    }
  }

  private async write(filePath: string, count: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    for(let i = 0; i < count; i++) {
      await appendFile(
        filePath,
        `${tsvOfferGenerator.generate()}\n`,
        {encoding: 'utf-8'}
      );
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
      console.info(`File ${filePath} has been successfully created`);
    } catch (err: unknown){
      console.error('Cannot load data');
      console.error(getErrorMessage(err));
    }
  }
}
