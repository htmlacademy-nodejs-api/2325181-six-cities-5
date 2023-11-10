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
              ${chalk.white.italic('--import <path> <login> <password> <host> <dbname> <salt>:')}             ${chalk.bgCyan('# импортирует данные из TSV файла по пути <path>, в базу данных <dbname>. Доступ к базе по имени пользователя <login> и паролю <password>. Адрес хоста базы <host>, соль для проверки пароля <salt>.')}
              ${chalk.white.italic('--generate <n> <path> <JSONServerUrl>:')}  ${chalk.bgGray('# генерирует <n> тестовых предложений, записывает в файл по пути <path>, источник данных JSON server по адресу <JSONServerUrl>')}
    `);
  }
}
