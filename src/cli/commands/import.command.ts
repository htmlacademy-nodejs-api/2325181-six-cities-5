import chalk from 'chalk';
import { TSVFileReader } from '../../shared/types/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      console.error(`${chalk.italic.bgRedBright('Cannot import data from the file:')} ${chalk.underline.redBright(filename)}`);
      console.error(`${chalk.bold.bgRedBright('Details:')} ${chalk.underline.redBright(err.message)}`);
    }
  }
}
