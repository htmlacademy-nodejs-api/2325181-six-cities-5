import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      ${chalk.blue.bold('Программа для подготовки данных для REST API сервера.')}
          ${chalk.green('Пример:')}
              ${chalk.yellow('cli.js --<command> [--arguments]')}
          ${chalk.magenta.underline('Команды:')}
              ${chalk.white.italic('--version:')}                   ${chalk.bgGreen('# выводит номер версии')}
              ${chalk.white.italic('--help:')}                      ${chalk.bgMagenta('# печатает этот текст')}
              ${chalk.white.italic('--import <path>:')}             ${chalk.bgCyan('# импортирует данные из TSV')}
              ${chalk.white.italic('--generate <n> <path> <url>:')}  ${chalk.bgGray('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
